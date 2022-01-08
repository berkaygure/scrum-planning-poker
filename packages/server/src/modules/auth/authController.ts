import { NextFunction, Request, Response } from 'express';
import { registerUser, loginUser, validateRefreshToken, logoutUser } from './authService';
import { COOKIE_OPTIONS } from '../../middleware/authenticate';
import passport from 'passport';

async function me(req: Request, res: Response) {
  res.json(req.user);
}

async function passportLogin(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        errors: [
          {
            status: 400,
            source: { pointer: 'login' },
            title: info?.message,
            type: 'auth',
          },
        ],
      });
    }
    req.logIn(user as any, function () {
      return next();
    });
  })(req, res, next);
}

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;
    const { token, refreshToken } = await registerUser({ username, password });

    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
    res.status(201).json({
      token,
    });
  } catch (err) {
    next(err);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { token, refreshToken } = await loginUser((req.user as any)?._id);
    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
    res.status(200).json({
      token,
    });
  } catch (err) {
    next(err);
  }
}

async function refreshToken(req: Request, res: Response, next: NextFunction) {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;

  try {
    const { token, refreshToken: refreshedToken } = await validateRefreshToken(refreshToken);
    res.cookie('refreshToken', refreshedToken, COOKIE_OPTIONS);
    res.status(200).json({
      token,
    });
  } catch (err) {
    next(err);
  }
}

async function logout(req: Request, res: Response, next: NextFunction) {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;
  try {
    logoutUser((req.user as any)?._id, refreshToken);
    res.clearCookie('refreshToken', COOKIE_OPTIONS);
    res.json({ message: 'Logout successful' });
  } catch (err) {
    next(err);
  }
}

export default {
  me,
  register,
  login,
  refreshToken,
  logout,
  passportLogin,
};
