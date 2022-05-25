const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 10,
    max: 255,
    lowercase : true
  },
  phone: {
    type: String,
    min: 5,
    max:20,
  },
  password: {
    type: String,
    required: true,
    min: 10,
    max: 1024,
  },
  isAdmin: {
      type: Boolean,
      default: false
  }
});


userSchema.methods.generateToken = function() {
    const token = jwt.sign({_id: this._id,name: this.name,email: this.email,isAdmin: this.isAdmin},process.env.PRIVATE_KEY)
    return token;
}


const User = mongoose.model("User", userSchema);


exports.User = User;



