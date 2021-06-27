const { UnauthorizedException, EntityDoesNotExists } = require('../exceptions');

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof UnauthorizedException) {
    res.status(403).json({
      errors: [{ unauthorized: err.message }],
    });
  } else if (err instanceof EntityDoesNotExists) {
    res.status(404).json({
      errors: [{ resource_not_found: err.message }],
    });
  } else {
    res.status(500).json({
      errors: [
        {
          message: err.message,
        },
      ],
    });
  }
}

module.exports = errorHandler;
