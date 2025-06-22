import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import notificationRoutes from './src/routes/notificationRoutes.js';
import http from 'http';    
import { Server } from 'socket.io';

dotenv.config();
const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

connectDB();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const onlineUsers = new Map();

io.on('connection', (socket) => {
  socket.on('register', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-notification', ({ receiverId, notification }) => {
    const socketId = onlineUsers.get(receiverId);
    if (socketId) io.to(socketId).emit('notification', notification);
  });

  socket.on('disconnect', () => {
    for (const [key, value] of onlineUsers.entries()) {
      if (value === socket.id) onlineUsers.delete(key);
    }
  });
});
