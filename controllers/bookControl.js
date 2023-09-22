import Book from '../models/Book.js';
import { createError } from '../utils/error.js';

// To create or POST a new book
export const createBook = async (req, res, next) => {
  const newBook = new Book(req.body);
  try {
    const savedBook = await newBook.save();
    res.status(200).json(savedBook);
  } catch (err) {
    next(err);
  }
};

// To UPDATE a book
export const updateBook = async (req, res, next) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },

      // to update immediately with needing to refresh the DB
      { new: true }
    );
    res.status(200).json(updatedBook);
  } catch (err) {
    next(err);
  }
};

// To DELETE a book
export const deleteBook = async (req, res, next) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json('Book has been Deleted');
  } catch (err) {
    next(err);
  }
};

// To GET all books
export const getAllBooks = async (req, res, next) => {
  try {
    const getallBook = await Book.find({});
    res.status(200).json(getallBook);
  } catch (err) {
    next(err);
  }
};

// To GET a book by Id
export const getBookId = async (req, res, next) => {
  try {
    const idBook = await Book.findById(req.params.id);
    res.status(200).json(idBook);
  } catch (err) {
    next(err);
  }
};

// To GET all books by Science
export const scienceBooks = async (req, res, next) => {
  try {
    const scienceBook = await Book.find({ bookCategory: 'science' });
    res.status(200).json(scienceBook);
  } catch (err) {
    next(err);
  }
};
// To GET all books by art
export const artBooks = async (req, res, next) => {
  try {
    const artBook = await Book.find({ bookCategory: 'art' });
    res.status(200).json(artBook);
  } catch (err) {
    next(err);
  }
};
