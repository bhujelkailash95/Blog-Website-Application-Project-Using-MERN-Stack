const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

//REGISTER
router.post("/", async (request, response) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(request.body.password, salt);
        const newUser = new User({
          username: request.body.username,
          email: request.body.email,
          password: hashedPass,
        });
    
        const user = await newUser.save();
        response.status(200).json(user);
      } catch (err) {
        response.status(500).json(err);
      }
    });

module.exports = router;