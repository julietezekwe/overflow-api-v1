class paramsChecker{
   static idChecker(req, res, next){
      const { userId, questionId, answerId } = req.params;
      const validId = /^[0-9]+$/;
      // check if id is valid
      
      const checkParam = param => {
          if (!param.match(validId)) {         
            return res.status(400).json({
              message: 'ID can only be a number',
              error: true
            });
          }
      }
      if(userId) checkParam(userId);
      if(questionId) checkParam(questionId);
      if(answerId) checkParam(answerId);
      return next();
    }
  };
  
  export default paramsChecker;
  