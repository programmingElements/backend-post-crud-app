const validate = (schema) => {
  return async (req, res, next) => {
    try {
      const parseBody = await schema.parseAsync(req.body);
      req.body = parseBody;
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export { validate }