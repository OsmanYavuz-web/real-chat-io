require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const Session = require('./models/Session');
const Message = require('./models/Message');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: process.env.CORS_METHODS.split(',')
  }
});

app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
  methods: ['GET', 'POST']
}));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch((err) => console.error('MongoDB bağlantı hatası:', err));

const sendSystemMessage = (socket, message, broadcast = false) => {
  const systemMessage = {
    username: 'Sistem',
    message,
    type: 'system',
    createdAt: new Date()
  };
  
  if (broadcast) {
    socket.broadcast.emit('chat message', systemMessage);
  } else {
    socket.emit('chat message', systemMessage);
  }
};

const handleUserLeave = async (socket, username) => {
  await Session.deleteMany({ username });
  socket.broadcast.emit('user left', username);
  sendSystemMessage(socket, `${username} sohbetten ayrıldı`, true);
  
  const sessions = await Session.find();
  io.emit('active users', sessions);
};

io.on('connection', (socket) => {
  socket.on('user joined', async (username) => {
    try {
      await Session.deleteMany({ username });
      await Session.create({
        username,
        socketId: socket.id
      });

      socket.broadcast.emit('user joined', username);
      sendSystemMessage(socket, `${username} sohbete katıldı`, true);
      sendSystemMessage(socket, 'Sohbete hoş geldiniz!');

      const recentMessages = await Message.find()
        .sort({ createdAt: -1 })
        .limit(50)
        .lean();

      recentMessages.reverse().forEach(msg => socket.emit('chat message', msg));

      const sessions = await Session.find();
      io.emit('active users', sessions);
    } catch (error) {
      console.error('Kullanıcı katılma hatası:', error);
    }
  });

  socket.on('chat message', async (data) => {
    try {
      const message = await Message.create({
        username: data.username,
        message: data.message,
        type: 'user',
        createdAt: new Date()
      });
      io.emit('chat message', message);
    } catch (error) {
      console.error('Mesaj gönderme hatası:', error);
    }
  });

  socket.on('user typing', (username) => {
    socket.broadcast.emit('user typing', username);
  });

  socket.on('user stop typing', (username) => {
    socket.broadcast.emit('user stop typing', username);
  });

  socket.on('user left', async (username) => {
    try {
      await handleUserLeave(socket, username);
    } catch (error) {
      console.error('Kullanıcı ayrılma hatası:', error);
    }
  });

  socket.on('disconnect', async () => {
    try {
      const session = await Session.findOne({ socketId: socket.id });
      if (session) {
        await handleUserLeave(socket, session.username);
      }
    } catch (error) {
      console.error('Bağlantı kesme hatası:', error);
    }
  });
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Server ${process.env.PORT} portunda çalışıyor`);
}); 