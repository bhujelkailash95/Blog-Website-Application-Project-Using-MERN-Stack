const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const Token = require("../models/Token");
const dotenv = require("dotenv");
dotenv.config();

//REGISTER
router.post("/register", async (request, response) => {
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
  resposne.status(500).json(err);
}
  });

//LOGIN
router.post("/login", async (request, response) => {
    // try {
    //   const user = await User.findOne({ username: req.body.username });
    //   !user && res.status(400).json("Wrong credentials!");
  
    //   const validated = await bcrypt.compare(req.body.password, user.password);
    //   !validated && res.status(400).json("Wrong credentials!");
  
    //   const { password, ...others } = user._doc;
    //  return res.status(200).json(others);
    // } catch (err) {
    //   return res.status(500).json(err);
    // }
    let user = await User.findOne({ username: request.body.username });
    if (!user) {
        return response.status(400).json({ msg: 'Username does not match' });
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            
            const newToken = new Token({ token: refreshToken });
            await newToken.save();
        
            response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, username: user.username, msg:'Logged in successfully.' });
        
        } else {
            response.status(400).json({ msg: 'Password does not match' })
        }
    } catch (error) {
        response.status(500).json({ msg: 'Error while login the user' })
    }
  });

module.exports = router