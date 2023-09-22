import mongoose from 'mongoose';

const { Schema } = mongoose;

const BookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  bookAuthor: {
    type: String,
    required: true,
  },
  bookImg: {
    type: String,
  },
  bookPdf: {
    type: String,
    required: true,
  },
  bookVid: {
    type: String,
    required: true,
  },
  bookCategory: {
    type: String,
    required: true,
  },
  bookDesc: {
    type: String,
  },
});

export default mongoose.model('Book', BookSchema);
