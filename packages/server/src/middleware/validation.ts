import { NextFunction, Request, Response } from 'express';

export default (schema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({
      errors: error.details.map((_error) => ({
        status: 400,
        source: { pointer: _error.path.join('/') },
        title: _error.message,
        type: _error.type,
      })),
    });
  } else {
    next();
  }
};
