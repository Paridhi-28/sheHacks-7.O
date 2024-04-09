//Validation
const joi = require("@hapi/joi");

//Register Validation
const registerValidation = (data) => {
  const schema = joi.object({
    name: joi.string().min(6).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
  });
  // Data Validation
  return schema.validate(data);
};

//Login Validation
const loginValidation = (data) => {
  // console.log(data)
  const schema = joi.object({
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
  });
  // Data Validation
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
