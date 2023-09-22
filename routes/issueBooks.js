import express from 'express';
import {
  deleteReqBook,
  getAllIssuedBooks,
  getOneIssueBook,
  requestBook,
  updateReqBook,
} from '../controllers/issueBookControl.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// To POST or request for a book
router.post('/request', verifyUser, requestBook);

// To GET all requested Books by the user
router.get('/reqBooks', verifyUser, getAllIssuedBooks);

// To GET a Requested book by id
router.get('/find/:id', verifyUser, getOneIssueBook);

// To UPDATE a requested book by the admin
router.put('/:id', verifyAdmin, updateReqBook);

// To DELETE a Requested book if not accepted by the admin
router.delete('/:id', verifyAdmin, deleteReqBook);

export default router;
