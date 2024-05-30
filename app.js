require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5080;
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
   cors: {
      origin: process.env.FRONTEND_URI,
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
   },
   cors: true
});

const connectDB = require("./Database/DB.js");
const cookieParser = require("cookie-parser");
const adminRouter = require("./Routes/Admin.js");
const logRouter = require("./Routes/Log.js");
const staffRouter = require("./Routes/Staff.js");
const studentRouter = require("./Routes/Student.js");
const courseRouter = require("./Routes/Course.js");
const courseModulesRouter = require("./Routes/CourseModule.js");
const courseBooking = require("./Routes/CourseBooking.js");
const chatRouter = require("./Routes/Chat.js");
const DiscussionPanel = require("./Routes/DiscussionPanel.js");
const taskRouter = require("./Routes/Tasks.js");
const searchRouter = require("./Routes/Search.js");
const calendarRouter = require("./Routes/Calandar.js");
const roomRouter = require("./webRTC/Routes/Room.js");
const ratingRoute = require("./Routes/Rating.js");
const Room = require('./webRTC/Models/Room.js');

app.use(express.json());
app.use(cookieParser());
connectDB();
app.use(cors());

app.use("/api/v2", logRouter);
app.use("/api/v2", adminRouter);
app.use("/api/v2", staffRouter);
app.use("/api/v2", studentRouter);
app.use("/api/v2", courseRouter);
app.use("/api/v2", courseModulesRouter);
app.use("/api/v2", courseBooking);
app.use("/api/v2", chatRouter);
app.use("/api/v2", DiscussionPanel);
app.use("/api/v2", taskRouter);
app.use("/api/v2", searchRouter);
app.use("/api/v2", calendarRouter);
app.use("/api/v2", roomRouter);
app.use("/api/v2", ratingRoute);

io.on('connection', (socket) => {
   console.log('New client connected:', socket.id);

   socket.on('createRoom', async ({ roomKey }) => {
      try {
         const room = new Room({ roomKey });
         await room.save();
         console.log(`Room created with ID: ${room._id} and Key: ${room.roomKey}`);
         socket.emit('roomCreated', { roomId: room._id, roomKey: room.roomKey });
      } catch (error) {
         console.error('Error creating room:', error);
         socket.emit('roomError', 'An error occurred while creating the room');
      }
   });

   socket.on('joinRoom', async ({ roomId, roomKey }) => {
      try {
         console.log(`Joining room: ${roomId} with key: ${roomKey}`);
         const room = await Room.findById(roomId);
         if (!room) {
            console.log('Room not found');
            socket.emit('roomError', 'Room not found');
            return;
         }

         if (room.roomKey !== roomKey) {
            console.log(`Invalid room key: provided ${roomKey}, expected ${room.roomKey}`);
            socket.emit('roomError', 'Invalid room key');
            return;
         }

         socket.join(roomId);
         console.log(`User ${socket.id} joined room ${roomId} with key ${roomKey}`);

         const clients = io.sockets.adapter.rooms.get(roomId) || new Set();
         const users = Array.from(clients).filter(client => client !== socket.id);

         socket.emit('allUsers', users);
         socket.to(roomId).emit('userJoined', {
            callerID: socket.id,
            signal: null
         });
      } catch (error) {
         console.error('Error joining room:', error);
         socket.emit('roomError', 'An error occurred while joining the room');
      }
   });

   socket.on('sendingSignal', (payload) => {
      console.log('Sending signal to user:', payload.userToSignal);
      io.to(payload.userToSignal).emit('userJoined', {
         signal: payload.signal,
         callerID: payload.callerID,
      });
   });

   socket.on('returningSignal', (payload) => {
      console.log('Returning signal to user:', payload.callerID);
      io.to(payload.callerID).emit('receivingReturnedSignal', {
         signal: payload.signal,
         id: socket.id,
      });
   });

   socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      socket.rooms.forEach((room) => {
         socket.to(room).emit('userDisconnected', socket.id);
      });
   });
});

server.listen(port, () => {
   console.log(`Server is listening on Port ${port}`);
});