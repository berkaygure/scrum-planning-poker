require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').Server(app);
// const io = require('socket.io')(http);
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const swaggerDocument = require('./swagger.json');

require('./config/index.js')(app, mongoose, express);

// Register routes
app.use(cors());
app.use(routes);
app.use(errorHandler);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 8080;

http.listen(PORT, () => {
  console.log(`listening on:${PORT}`);
});

module.exports = app;
