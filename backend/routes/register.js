const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const dotenv = require("dotenv");

dotenv.config();

//REGISTER
router.post("/", async (request, response) => {
    try {
      const {error} = validate(request.body);
      if(error)
      return response.status(400).send({message: error.details[0].message});
      const user = await User.findOne({email:request.body.email});
      if(user)
      return response.status(409).send({message:"User with given email already exists."});
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(request.body.password, salt);
      await new User({...request.body, password:hashPassword}).save();
      response.status(200).send({message: "User created successfully"});

      } catch (error) {
        response.status(500).send({msg:"Internal Server Error"});
      }
    });

    const validate = (data) => {
      const schema = Joi.object({
        username: Joi.string().required().label("Username"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
      });
      return schema.validate(data);
    };

module.exports = router;