import mongoose from 'mongoose';

const IssueBookSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  bookStatus: {
    type: String,
  },
});

export default mongoose.model('IssueBook', IssueBookSchema);
