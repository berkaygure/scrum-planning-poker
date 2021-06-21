const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const routes = require("./routes");
const db = require("./db");
const app = express();
 
 
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

express.json()
app.use(cors());
app.use(routes);


const server = app.listen(process.env.PORT || 8080, () =>
  console.log("Server has started on 8080")
);

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const users = [];


io.on('connection', function(socket) {
  socket.on('joinRoom', function({ userId, room }) {
      users.push({ id: socket.id, userId, room })
      socket.join(room);

      io.to(room).emit('onlineUsers', {
        users: users.filter(x => x.room === room)
      }); 
  });

  socket.on('disconnect', () => {
    const userIndex = users.findIndex(x => x.id === socket.id);
    if (userIndex > -1) {
      const user = users[userIndex];
      users.splice(userIndex, 1);

      io.to(user.room).emit('onlineUsers', {
        users: users.filter(x => x.room === user.room)
      });
    }
  });
});