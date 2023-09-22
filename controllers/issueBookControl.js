import { createError } from '../utils/error.js';
import IssueBook from '../models/IssueBook.js';
import User from '../models/User.js';
import Book from '../models/Book.js';

// To request a book or POST a book
export const requestBook = async (req, res, next) => {
  try {
    const book = await Book.findOne({ bookName: req.query.bookName });
    const user = await User.findOne({ username: req.query.username });

    const bookReq = new IssueBook({
      userId: user._id,
      bookId: book._id,
      bookStatus: '',
    });
    const bookDone = await bookReq.save();
    res.status(200).json(bookDone);
  } catch (err) {
    next(err);
  }
};

// To GET all requested Books by the user
export const getAllIssuedBooks = async (req, res, next) => {
  try {
    const books = await IssueBook.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $lookup: {
          from: 'books',
          localField: 'bookId',
          foreignField: '_id',
          as: 'bookDetails',
        },
      },
    ]);
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

// To GET a Requested book by Id
export const getOneIssueBook = async (req, res, next) => {
  try {
    // const idBook = await IssueBook.findById(req.params.id).populate([
    //   'bookId',
    //   'userId',
    // ]);
    const idBook = await IssueBook.findById(req.params.id).populate('bookId');
    res.status(200).json(idBook);
  } catch (err) {
    next(err);
  }
};

// To UPDATE the book Request page
export const updateReqBook = async (req, res, next) => {
  try {
    const updatedReqBook = await IssueBook.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      // to update immediately without needing to refresh the DB
      { new: true }
    );
    res.status(200).json(updatedReqBook);
  } catch (err) {
    next(err);
  }
};

// To DELETE a Requested book if not accepted by the admin
export const deleteReqBook = async (req, res, next) => {
  try {
    await IssueBook.findByIdAndDelete(req.params.id);
    res.status(200).json('Request has been Deleted');
  } catch (err) {
    next(err);
  }
};
