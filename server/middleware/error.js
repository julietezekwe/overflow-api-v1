const ErrorHandler= (errors, code) => {
  
 
        if(errors){
             let validationErrors = [];
            errors.map(err => validationErrors.push(err.msg));
            return res.status(400).json({
              errors: validationErrors
            });
        }
  }

export default ErrorHandler;