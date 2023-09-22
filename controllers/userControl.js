import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';

//To register a new user
export const register = async (req, res, next) => {
  try {
    // To check if the email exist
    const exists = await User.findOne({ email: req.body.email });
    if (exists) return next(createError(404, 'Email Already in use'));

    // To check if the username exist
    const userCheck = await User.findOne({ username: req.body.username });
    if (userCheck) return next(createError(404, 'Username Already taken'));

    // For encrypting of password in DB
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    // For creating the new user
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send('User has been created');
  } catch (err) {
    next(err);
  }
};

// To login a user
export const login = async (req, res, next) => {
  try {
    // To check if password or username is correct
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, 'user not found'));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, 'Wrong password or username'));

    const token = jwt.sign({ id: user._id }, process.env.JWT);

    // to remove other details and not showing all details after login

    // To destructure my user, that's to display some few things and hide some
    const { password, ...otherDetails } = user._doc;
    res
      .cookie('access_token', token, {
        // it doesn't allow any client secret to reach this cookie
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};

// To UPDATE OR PUT a user
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// To DELETE a user
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted');
  } catch (err) {
    next(err);
  }
};

// To GET a particular user
export const getUserId = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
// To GET all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// To GET a user by it's name
export const getUserName = async (req, res, next) => {
  try {
    const userFindName = await User.find({ fullName: req.query.fullName });
    res.status(200).json(userFindName);
  } catch (err) {
    next(err);
  }
};
