import express from 'express';
import authController from './authController';
import authenticate from '../../middleware/authenticate';
import { loginValidate } from './authValidation';
import validation from '../../middleware/validation';

const router = express.Router();

router.get('/me', authenticate, authController.me);
router.get('/logout', authenticate, authController.logout);
router.post('/refreshToken', authController.refreshToken);
router.post('/register', validation(loginValidate), authController.register);

router.post(
  '/login',
  validation(loginValidate),
  authController.passportLogin,
  authController.login,
);

export default router;
