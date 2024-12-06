import user from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Route for register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //checking if exist user is available or not
    const exists = await user.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "user already Exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "please enter a valid Email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter a strong Password",
      });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new user({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const User = await newUser.save();

    const token = createToken(User._id);
    res.json({ success: true, token: `${token}` });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//Router for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await user.findOne({ email });

    if (!exists) {
      return res.json({
        success: false,
        message: "user not exists",
      });
    }
    const IsMatch = await bcrypt.compare(password, exists.password);
    if (IsMatch) {
      const token = createToken(exists._id);
      res.json({
        success: true,
        token: token,
      });
    } else {
      res.json({ success: false, message: "invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//route for Admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        message: "you are not admin",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export { loginUser, registerUser, adminLogin };
