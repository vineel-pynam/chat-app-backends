import express from 'express';
import  dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import connectToMongoDB from './db/connectToMongoDB.js';
import { addMessagesToConversation } from './controllers/msgs.controller.js';
import msgRouter from './routes/msgs.route.js';

dotenv.config();
const port = process.env.PORT || 5000; 

const app = express();
const server = http.createServer(app);
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "*",
    allowedHeaders: ["*"],
    allowedMethods: ["GET", "POST"],
  }
});

const userSocketMap = {};

io.on('connection', (socket) => {
  const username = socket.handshake.query.username; 
  console.log("Username: ", username);

  userSocketMap[username] = socket;

  socket.on('chat message', (msg) => {
    // socket.broadcast.emit('chat message', msg);
    // console.log('message: ' + msg);
    const receiverSocket = userSocketMap[msg.receiver];
    if(receiverSocket) {
      receiverSocket.emit('chat message', msg.message);
    }
    addMessagesToConversation([msg.sender, msg.receiver], {
      sender: msg.sender,
      receiver: msg.receiver,
      message: msg.message
    });
    console.log('message: ', msg);
  });
  
});

app.use('/msgs', msgRouter);

app.get('/', (req, res) => {
  res.send('Congratulations HHLD Folks!');
});



// Start the server
server.listen(port, () => {
  connectToMongoDB();
  console.log(`Server is listening at http://localhost:${port}`);
});