import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getUserName,
  login,
  register,
  updateUser,
} from '../controllers/userControl.js';
import { verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// To REGISTER OR POST a user
router.post('/register', register);

// To LOGIN OR POST  a user
router.post('/login', login);

// To UPDATE OR PUT a user
router.put('/:id', verifyUser, updateUser);

// To DELETE  a user
router.delete('/:id', verifyUser, deleteUser);

export default router;
