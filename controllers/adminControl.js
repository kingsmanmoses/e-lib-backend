import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';

//To register an new Admin
export const adminRegister = async (req, res, next) => {
  try {
    // To check if the email exist
    const exists = await Admin.findOne({ email: req.body.email });
    if (exists) return next(createError(404, 'Email Already in use'));

    // To check if the AdminName exist
    const AdminCheck = await Admin.findOne({ username: req.body.username });
    if (AdminCheck) return next(createError(404, 'Username Already taken'));

    // For encrypting of password in DB
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    // For creating the new admin user
    const newAdmin = new Admin({
      ...req.body,
      password: hash,
    });

    await newAdmin.save();
    res.status(200).send('admin User has been created');
  } catch (err) {
    next(err);
  }
};

// To login an admin
export const adminLogin = async (req, res, next) => {
  try {
    // To check if password or username is correct
    const adminUser = await Admin.findOne({ username: req.body.username });
    if (!adminUser) return next(createError(404, 'user not found'));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      adminUser.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, 'Wrong password or username'));

    const token = jwt.sign(
      { id: adminUser._id, isAdmin: adminUser.isAdmin },
      process.env.JWT
    );
    // to remove other details and not showing all details after login

    // To destructure my adminUser, that's to display some few things and hide some
    const { password, ...otherDetails } = adminUser._doc;

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

// To UPDATE OR PUT an admin
export const updateAdminUser = async (req, res, next) => {
  try {
    const updatedAdminUser = await Admin.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedAdminUser);
  } catch (err) {
    next(err);
  }
};

// To DELETE a user
export const deleteAdminUser = async (req, res, next) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json('admin has been deleted');
  } catch (err) {
    next(err);
  }
};
