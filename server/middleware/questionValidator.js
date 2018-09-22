class questionValidator{
    static createQuestionValidator(req, res, next){
      if (req.body.title.trim() === '' || req.body.body.trim() === '') {
        return res.status(400).json({
          message: 'Please fill in all fields',
          error: true
        });
      } else {
      req.check('title', 'Question Title is required').notEmpty();
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
    }
  };
  
  export default questionValidator;
  