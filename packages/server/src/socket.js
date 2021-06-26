'use strict';

const socket = require('socket.io');

function handleSocket(server) {
  const io = socket(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  const users = [];

  io.on('connection', function (socket) {
    socket.on('joinRoom', function ({ userId, room }) {
      users.push({ id: socket.id, userId, room });
      socket.join(room);

      io.to(room).emit('onlineUsers', {
        users: users.filter((x) => x.room === room),
      });
    });

    socket.on('disconnect', () => {
      const userIndex = users.findIndex((x) => x.id === socket.id);
      if (userIndex > -1) {
        const user = users[userIndex];
        users.splice(userIndex, 1);

        io.to(user.room).emit('onlineUsers', {
          users: users.filter((x) => x.room === user.room),
        });
      }
    });
  });
}

module.exports = handleSocket;
