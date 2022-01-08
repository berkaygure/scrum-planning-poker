import User from './user';
import { getRefreshToken, getToken } from '../../middleware/authenticate';
import { AppError } from '../../exceptions/AppError';
import { REFRESH_TOKEN_SECRET } from '../../config';
import jwt from 'jsonwebtoken';

interface UserRequest {
  username: string;
  password: string;
}

async function findUserById(userId: number) {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError('User Not Found', 404, '', false);
  }
  return user;
}

async function registerUser({ username, password }: UserRequest): Promise<{
  token: string;
  refreshToken: string;
}> {
  const user = await (User as any).register(new User({ username }), password);
  const token = getToken({ _id: user._id });
  const refreshToken = getRefreshToken({ _id: user._id });
  user.refreshToken.push({ refreshToken });
  await user.save();

  return {
    token,
    refreshToken,
  };
}

async function loginUser(id?: number) {
  const token = getToken({ _id: id });
  const refreshToken = getRefreshToken({ _id: id });
  const user = await findUserById(id);
  (user as any).refreshToken.push({ refreshToken });
  await user.save();

  return {
    token,
    refreshToken,
  };
}

async function validateRefreshToken(refreshToken?: string) {
  if (!refreshToken) {
    throw new AppError('Unauthorized', 401, 'No refresh token provided on cookie', false);
  }

  const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
  const userId = payload._id;

  if (!userId) {
    throw new AppError('Unauthorized', 401, 'Invalid refresh token', false);
  }

  const user = await findUserById(userId);
  const tokenIndex = (user as any).refreshToken.findIndex(
    (item) => item.refreshToken === refreshToken,
  );

  if (tokenIndex === -1) {
    throw new AppError('Unauthorized', 401, '', false);
  }

  const token = getToken({ _id: userId });
  const newRefreshToken = getRefreshToken({ _id: userId });
  (user as any).refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
  await user.save();

  return {
    refreshToken: newRefreshToken,
    token,
  };
}

async function logoutUser(id?: number, refreshToken?: string) {
  const user = await findUserById(id);

  const tokenIndex = (user as any).refreshToken.findIndex(
    (item) => item.refreshToken === refreshToken,
  );

  if (tokenIndex !== -1) {
    (user as any).refreshToken.id((user as any).refreshToken[tokenIndex]._id).remove();
  }
  await user.save();
  return true;
}

export { findUserById, registerUser, loginUser, validateRefreshToken, logoutUser };
