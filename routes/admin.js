import express from 'express';
import {
  adminLogin,
  adminRegister,
  deleteAdminUser,
  updateAdminUser,
} from '../controllers/adminControl.js';
import {
  deleteUser,
  getAllUsers,
  getUserId,
  getUserName,
  register,
  updateUser,
} from '../controllers/userControl.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// To REGISTER OR POST a admin
router.post('/register', adminRegister);

// To POST 0r create a new USER in the DB
router.post('/user/register', verifyAdmin, register);

// To LOGIN OR POST  a admin
router.post('/login', adminLogin);

// To UPDATE OR PUT an admin
router.put('/:id', verifyUser, updateAdminUser);

// To UPDATE OR PUT a particular USER
router.put('/user/:id', verifyAdmin, updateUser);

// To DELETE  an admin
router.delete('/:id', verifyUser, deleteAdminUser);

// To DELETE A USER
router.delete('/user/:id', verifyAdmin, deleteUser);

// To GET a particular USER
router.get('/user/:id', verifyAdmin, getUserId);

// To GET all users
router.get('/', getAllUsers);

// To GET all user by name
router.get('/name', getUserName);

export default router;
