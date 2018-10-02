import errorHandler from "./errors";
class answerValidator {
    static createAnswerValidator(req, res, next){
      if (req.body.body.trim() === '') {
        return res.status(400).json({
          message: 'Please fill in all fields',
          error: true
        });
      } else {
      req.check('body', 'response Body is required').notEmpty();
      const errors = req.validationErrors();
      const validationErrors = [];
      errorHandler();
      return next();
    }
  }
  };
  
  export default answerValidator;