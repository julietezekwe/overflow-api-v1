const answerValidator = {
    createAnswerValidator: (req, res, next) => {
      req.check('body', 'Question Body is required').notEmpty();
      const errors = req.validationErrors();
      const validationErrors = [];
      if (errors) {
        errors.map(err => validationErrors.push(err.msg));
        return res.status(400).json({
          errors: validationErrors
        });
      }
      return next();
    }
  };
  
  export default answerValidator;