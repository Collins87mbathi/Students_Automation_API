const User = require("../models/Users");
const {ApiError}= require("../Errors/Errors");
const jwt = require("jsonwebtoken");
const { EmailValidator} = require("../validators/email");

const Register = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) return res.status(404).json("This user already exist");
    if (!fullname || !email || !password)
      return res.status(404).json("please input values")
    if (!EmailValidator(email))
      return next(ApiError.BadRequest("Enter a valid email"));
    const savedUser = await User.create({
      fullname,
      email,
      password,
    });
    await savedUser.save();
    res.status(200).json("User created");
  } catch (error) {
    console.log(error);
  }
};

const Login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password)
      return next(ApiError.NotFound("Please input values"));
    const user = await User.findOne({ email: req.body.email });
    // if (!user) return next(ApiError.NotFound("This user does not exist"));
    if (!user) return res.status(401).json("This user does not exist")
    const isMatch = await user.matchPassword(req.body.password);
    if (!isMatch) return res.status(404).json("Please input password");
    const token = jwt.sign(
      { id: user._id, email: user.email },
      "elie"
    );
    const { password, ...otherDetails } = user._doc;
    res.status(200).json({ user: { ...otherDetails, token } });
  } catch (error) {
    console.log(error);
  }
};

const GetUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(ApiError.InternalError("Error"));
  }
};

const DeleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User is deleted");
  } catch (error) {
    next(ApiError.InternalError("Error"));
  }
};

module.exports = { Register, Login, GetUser, DeleteUser };
