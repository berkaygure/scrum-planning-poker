require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const routes = require('./routes');

require('./config/index.js')(app, mongoose, express);

// Register routes
app.use(routes);

http.listen(process.env.PORT || 8080, function () {
  console.log('listening on :' + process.env.PORT);
});

module.exports = app;
