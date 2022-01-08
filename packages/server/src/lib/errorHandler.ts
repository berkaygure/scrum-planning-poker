import { AppError } from '../exceptions/AppError';
import { Response } from 'express';
import { isTest } from '../utils';
import logger from './logger';

class ErrorHandler {
  public async handleError(error: Error, responseStream?: Response): Promise<void> {
    if (!isTest()) {
      await logger.error(error, error.message);
    }

    if (error instanceof AppError) {
      responseStream.status(error.httpCode).json({
        errors: [
          {
            status: error.httpCode,
            source: { pointer: 'app.error' },
            title: error.message,
            type: 'refresh',
          },
        ],
      });
      return;
    }

    switch (error.name) {
      case 'UserExistsError':
        responseStream.status(409).json({
          errors: [
            {
              status: 409,
              source: { pointer: 'register' },
              title: error.message,
              type: 'userExists',
            },
          ],
        });
        break;
      default:
        responseStream.json(error);
        break;
    }
  }
}

export default new ErrorHandler();
