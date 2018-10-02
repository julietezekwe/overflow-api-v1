const errorHandler = () => {
    return ({
        if (errors) {
            errors.map(err => validationErrors.push(err.msg));
            return res.status(400).json({
              errors: validationErrors
            });
          }
    })
}

export default errorHandler;