const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const zxcvbn = require("zxcvbn");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.loginUser = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password.");
  
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid email or password");
  
    user.generateAuthToken();
    res.status(200).send("Login successful!");
};

function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(1024).required(),
    };
  
    return Joi.validate(req, schema);
}

// FORGOT PASSWORD AND RESET PASSWORD
