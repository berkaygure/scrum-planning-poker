import passport from 'passport';
import jwt from 'jsonwebtoken';
import { isDev } from '../utils';
import { JWT_SECRET, REFRESH_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET, SESSION_EXPIRY } from '../config';
import { CookieOptions } from 'express';

const dev = isDev();

export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: !dev,
  signed: true,
  maxAge: eval(REFRESH_TOKEN_EXPIRY) * 1000,
  sameSite: 'none',
};

export const getToken = (user) => {
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: eval(SESSION_EXPIRY),
  });
};

export const getRefreshToken = (user) => {
  const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET, {
    expiresIn: eval(REFRESH_TOKEN_EXPIRY),
  });
  return refreshToken;
};

export default passport.authenticate('jwt', { session: false });
