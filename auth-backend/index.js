import express from 'express';
import  dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/userRouter.js';
import connectToMongoDB from './db/connectToMongoDB.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const port = process.env.PORT || 5000; 

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(
  {
    origin: ['http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003'],
    credentials: true
  }
));
app.use('/auth', authRouter);
app.use('/users', userRouter);

// Define a route
app.get('/', (req, res) => {
  res.send('Congratulations HHLD Folks!');
});

// Start the server
app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server is listening at http://localhost:${port}`);
});