import { NextFunction, Request, Response } from 'express';

import errorHandler from '../lib/errorHandler';

const errorHandlerMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  await errorHandler.handleError(err, res);
};

export default errorHandlerMiddleware;
