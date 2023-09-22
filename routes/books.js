import express from 'express';
import {
  artBooks,
  createBook,
  deleteBook,
  getAllBooks,
  getBookId,
  scienceBooks,
  updateBook,
} from '../controllers/bookControl.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

/**
 * * you can use it to get any api response or request
 *
 */

// To create a book or POST a book
router.post('/', verifyAdmin, createBook);

// To UPDATE a book
router.put('/:id', verifyAdmin, updateBook);

// To  DELETE a book
router.delete('/:id', verifyAdmin, deleteBook);

// To GET all books
router.get('/', getAllBooks);

// To GET a book by id
router.get('/find/:id', getBookId);

// to GET all books by Type/Category
router.get('/science', scienceBooks);
router.get('/art', artBooks);

export default router;
