export const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const firstError = result.error.issues[0].message;
      return res.status(400).json({
        success: false,
        errors: firstError,
      });
    }

    req.body = result.data;
    next();
  };
};
