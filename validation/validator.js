
const Joi = require("@hapi/joi")
const { phone } = require("phone");
const {User} = require('../models/user')


function userValidator(req) {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      password: Joi.string().min(5).required(),
      phone: Joi.string().optional(),
      email: Joi.string().min(10).email().required(),
    });
    return schema.validate(req.body);
}

function phoneValidator(phoneNumber){
  return phone(phoneNumber,{strictDetection: true});
}

const objectValidatorMid = (validObject) => {
  return (req,res,next) => {
     const { error } = validObject(req);
     if (error) return res.status(400).send(error.details[0].message);
     next();
  }
}
const phoneValidatorMid = (validPhone) => {
  return (req,res,next) => {
      if (req.body.phone){
        if (!validPhone(req.body.phone).isValid)
            return res.send("the phone number provided is incorrect, please try again ")
        req.body.phone = phoneValidator(req.body.phone).phoneNumber
        next();
    }
  }
}





exports.userValidator = userValidator
exports.phoneValidator = phoneValidator
exports.objectValidatorMid = objectValidatorMid;
exports.phoneValidatorMid = phoneValidatorMid
