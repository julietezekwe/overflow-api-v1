const userValidator = {
    userSignUp: (req, res, next) => {
      if (req.body.name.trim() === '' || req.body.email.trim() === '' || req.body.password.trim() === '') {
      return res.status(400).json({
        message: 'Please fill in all fields',
        error: true
      });
    }
     else { req.check('name', 'Name is required').notEmpty();
      req.check('email', 'Email is required').notEmpty();
      req.check('email', 'Email is not valid').isEmail();
      req.check('password', 'Password is required').notEmpty();
      req
        .check('password', 'Minimum password length is 5 characters')
        .isLength({ min: 5 });

      const errors = req.validationErrors();
      const validationErrors = [];
      if (errors) {
        errors.map(err => validationErrors.push(err.msg));
        return res.status(400).json({
          errors: validationErrors
        });
      }
    }
      return next();
    },
      
    userLogin: (req, res, next) => {
      if (req.body.email.trim() === '' || req.body.password.trim() === '') {
        return res.status(400).json({
          message: 'Please fill in all fields',
          error: true
        });
      } else { 
          req.check('email', 'email is required').notEmpty();
          req.check('password', 'Password is required').notEmpty();
          const errors = req.validationErrors();
          const validationErrors = [];
          if (errors) {
            errors.map(err => validationErrors.push(err.msg));
            return res.status(400).json({
              errors: validationErrors
            });
          }
    }
      return next();
    }
  };
  
  export default userValidator;
  