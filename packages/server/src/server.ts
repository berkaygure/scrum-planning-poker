import http from 'http';
import app from './app';
import logger from './lib/logger';
import { PORT } from './config';
import { io } from './modules/socket';

const port = PORT || 3001;
const host = process.env.HOST;

app.set('port', port);

const server = http.createServer(app);
io.attach(server);

server.listen(port, () => {
  logger.info(`App listening on port ${port}!`);
  logger.info(`App whitelisted for ${host}`);
});

export default server;
