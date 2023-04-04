const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const zxcvbn = require("zxcvbn");
const { User, validate } = require("../models/user");

exports.getUser = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
};

exports.create = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["username", "email", "first_name", 
                                    "last_name", "phone", "password"]));

  const passwordStrength = zxcvbn(req.body.password);
  if (passwordStrength < 2) {
    return res
      .status(400)
      .send("The password is too weak. Please choose a stronger password.");
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send({ message: "User registered successfully!" });
};
