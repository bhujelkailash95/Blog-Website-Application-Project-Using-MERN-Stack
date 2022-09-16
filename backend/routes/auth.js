const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const Token = require("../models/Token");
const dotenv = require("dotenv");
const Joi = require("joi")

dotenv.config();

//LOGIN
router.post("/login", async (request, response) => {
    
    const { error } = validate(request.body);
      if (error)
        return response.status(400).json({ msg: error.details[0].msg });
      const user = await User.findOne({ username: request.body.username });
      if (!user) {
          return response.status(401).json({ msg: 'Username does not match' });
      }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            
            const newToken = new Token({ token: refreshToken });
            await newToken.save();
        
            response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, username: user.username, _id:user.id, msg:'Logged in successfully.' });
        
        } else {
            response.status(401).json({ msg: 'Password does not match' })
        }
    } catch (error) {
        response.status(500).json({ msg: 'Error while login the user' })
    }
  });

  const validate = (data) => {
    const schema = Joi.object({
      username: Joi.string().required().label("Username"),
      password: Joi.string().required().label("Password")
    });
    return schema.validate(data);
  };

module.exports = router