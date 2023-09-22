import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
});

export default mongoose.model('User', UserSchema);
