import questionModel from '../dummyModel/QuestionModel';
import userModel from '../dummyModel/UserModel';

class Questions {
    static getAllQuestions(req, res){
        if(questionModel.length > 0){
            return res.status(201).json({
                questionModel,
                message: 'success'            
              }); 
        } else {
            return res.status(400).json({
                message: 'no questions found',
                error: true,
        
              });
        } 
    }
    static getQuestion(req, res){
       const { questionId } = req.params;
     
        let found = false;
        let questionDetail;
           questionModel.map(question => {  
            // found a question
             if(question.id === Number(questionId)){                  
                found = true;
                questionDetail = question; 
                return res.status(201).json({
                    questionDetail,
                    message: 'Success',
                    
                  });        
              }
            });
            // wrong id
            if(!found){
                return res.status(400).json({
                    message: 'no questions found',
                    error: true,
            
                  });
            }    
    }

    static getUserQuestion(req, res){
        const { userId } = req.params;
        let found = false;
        let questions=[];
           questionModel.map(question => {  
            // found a question
             if(question.userId === Number(userId)){                  
                found = true;
                questions.push(question); 
                       
              }
            });
            if(found){
                return res.status(201).json({
                    questions,
                    message: 'Success',
                    
                  }); 
            }
            // wrong id
            if(!found){
                return res.status(400).json({
                    message: 'no questions found',
                    error: true,
            
                  });
            }    
    }
    
    static createQuestion(req, res) {
        const {id, email } = req.authData;
        const { title, body } = req.body;
      
            // push to the model
            questionModel.push({
                id: questionModel.length + 1,
                title,
                body,
                userId :id,
                created_at: new Date()
            });
            
            return res.status(201).json({
                message: 'succefully created a question',
               error: false
              });      
    }
}

export default Questions;