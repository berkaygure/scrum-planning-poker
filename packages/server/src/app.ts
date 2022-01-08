import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { COOKIE_SECRET, WHITELISTED_DOMAINS } from './config';
import errorHandler from './lib/errorHandler';
import { URL_AUTH, URL_ROOMS } from '@scrum-game/common';
import errorHandlerMiddleware from './middleware/errorCatcher';

import './modules/auth/JwtStrategy';
import './modules/auth/LocalStrategy';
import authenticate from './middleware/authenticate';

// Import Routes
import { authRouter } from './modules/auth';
import { roomRouter } from './modules/room';
import { taskRouter } from './modules/task';
import { connectToDatabase } from './lib/database';

const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cookieParser(COOKIE_SECRET));
app.use(
  cors({
    origin: WHITELISTED_DOMAINS,
    credentials: true,
  }),
);
app.use(passport.initialize());

process.on('unhandledRejection', (reason: string, p: Promise<any>) => {
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  errorHandler.handleError(error);
});

// Connection to MongoDB
connectToDatabase();

// Define Routes
app.use(URL_AUTH, authRouter);
app.use(URL_ROOMS, authenticate, roomRouter);
app.use(URL_ROOMS, authenticate, taskRouter);
app.use(errorHandlerMiddleware);

export default app;
