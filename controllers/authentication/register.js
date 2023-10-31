const bcrypt = require("bcryptjs");
const { User } = require(`../../schemas/user`);
const { createError } = require(`../../helpers`);
const tokenService = require("../../config/tokenService");

const register = async (req, res) => {

  const {
    name,
    email,
    password,
    height = null,
    age = null,
    currentWeight = null,
    desiredWeight = null,
    bloodType = 1,
  } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    createError("Email in use");
  }


  const createdAt = new Date().toLocaleDateString();
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = tokenService.generateVerificationToken();

  const newUser = new User({
    name,
    email,
    password:hashPassword,
    createdAt,
    height,
    age,
    currentWeight,
    desiredWeight,
    bloodType,
  });
  await newUser.save();

  const token = verificationToken;

  res.status(201).json({
    token,
    user: {
      name,
      email,
        createdAt,
      height,
      age,
      currentWeight,
      desiredWeight,
      bloodType,
    },
  });
};

module.exports = register;
