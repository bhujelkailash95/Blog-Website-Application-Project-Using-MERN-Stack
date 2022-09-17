const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//UPDATE
router.put("/:id", async (request, response) => {
  if (request.body.userId === request.params.id) {
    if (request.body.password) {
      const salt = await bcrypt.genSalt(10);
      request.body.password = await bcrypt.hash(request.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        request.params.id,
        {
          $set: request.body,
        },
        { new: true }
      );
      response.status(200).json(updatedUser);
    } catch (error) {
      response.status(500).json(error);
    }
  } else {
    response.status(401).json("You can update only your account!");
  }
});

//DELETE
router.delete("/:id", async (request, response) => {
  if (request.body.userId === request.params.id) {
    try {
      const user = await User.findById(request.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(request.params.id);
        response.status(200).json("User has been deleted...");
      } catch (error) {
        response.status(500).json(error);
      }
    } catch (error) {
      response.status(404).json("User not found!");
    }
  } else {
    response.status(401).json("You can delete only your account!");
  }
});

//GET USER
router.get("/:id", async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    const { password, ...others } = user._doc;
    response.status(200).json(others);
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;
