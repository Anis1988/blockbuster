const express = require("express");
const { auth, admin } = require("../middleware/auth");
const routes = express.Router();
const {User} = require('../models/user')
const {comparing,hashing} = require("../validation/hashing");
const {
  userValidator,
  phoneValidator,
  objectValidatorMid,
  phoneValidatorMid,
} = require("../validation/validator");





routes.get('/me' ,[auth,admin], (req,res) => {
    res.send("you Got it you are an ADMIN  !!!!")
})


routes.post("/create",[phoneValidatorMid(phoneValidator), objectValidatorMid(userValidator)],
  async (req, res) => {
    // const {error} =  userValidator(req)
    // if (error) return res.status(400).send(error.details[0].message);
    // if (req.body.phone){
    //     if (!phoneValidator(req.body.phone).isValid)
    //         return res.send("the phone number provided is incorrect, please try again ")
    //     req.body.phone = phoneValidator(req.body.phone).phoneNumber
    // }

    let newUser = new User({
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      phone: req.body.phone,
      password: hashing(req.body.password),
    });
    newUser = await newUser.save();
    const token = newUser.generateToken();
    res.header("x-token",token).status(201).send({
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
    });
  }
);



routes.post('/login' ,async (req,res) => {
    let user;
    if (req.body.email.toLowerCase()) {
      user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(404).send("Email or Password are invalid !");
    }
    const verifyPass =  comparing(req.body.password,hashing(req.body.password))
    if (!verifyPass) return res.status(404).send("Email or Password are invalid !");

    const token = user.generateToken();
    res.header("user",user.name)
    res.header("x-token",token)
    .send(token);

})


module.exports = routes;
