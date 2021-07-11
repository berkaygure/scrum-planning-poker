export const parseValidationErrors = (error?: Record<string, string>[]) => {
  const validationErrors: ValidationError[] = [];

  if (error === undefined) {
    return validationErrors;
  }

  for (const e of error) {
    Object.entries(e).forEach((error) => {
      validationErrors.push({
        field: error[0],
        message: error[1],
      });
    });
  }

  return validationErrors;
};
