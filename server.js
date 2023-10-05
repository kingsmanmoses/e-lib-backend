import express from 'express';
import dotenv from 'dotenv';
// mongoose is to create schemas and also connect to the DB
import mongoose from 'mongoose';
import cors from 'cors';
import bookRoute from './routes/books.js';
import userRoute from './routes/users.js';
import adminRoute from './routes/admin.js';
import issueRoute from './routes/issueBooks.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

// To create an express
const app = express();
// dotenv is to hide essential code or password
dotenv.config();

// For connecting to the DB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('connected to Mongodb baby');
  } catch (error) {
    throw error;
  }
};

// to show when the DB is disconnected or connected back (This is through IP address)
mongoose.connection.on('disconnected', () => {
  console.log('Mongodb disconnected');
});
mongoose.connection.on('connected', () => {
  console.log('Mongodb connected');
});
/**
 *Middleware
 **middleware is use to reach our req and res before sending anything to the user
 */

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// to be able to send a json file we use express.json
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.json());

/**
 * *in this section we're making use of a location(to know where
 * *to send the api request) and what req or res(routes) to give the user
 */
app.use('/api/books', bookRoute);
app.use('/api/users', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/issueBook', issueRoute);

// Error handling Middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong';

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.get("/*", function (req, res) {
  res.sendFile(path.resolve(__dirname, '../e-lib/build', 'index.html'));
})

// To listen for a port/ request number
app.listen(process.env.PORT, () => {
  // To show that the backend is connected to the DB
  connect();
  // To show that is connected to the backend
  console.log('Connected to E-lib backend');
});
