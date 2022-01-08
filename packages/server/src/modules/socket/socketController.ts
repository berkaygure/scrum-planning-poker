import { WHITELISTED_DOMAINS } from '../../config';
import { Server } from 'socket.io';

const io = new Server({
  cors: {
    origin: WHITELISTED_DOMAINS,
    methods: ['GET', 'POST', 'OPTIONS'],
  },
});

const users = [];

io.on('connection', (socket) => {
  socket.on('join', ({ userId, room }) => {
    if (!users.find((user) => user.userId === userId)) {
      users.push({ id: socket.id, userId, room });
    }
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

export default io;
