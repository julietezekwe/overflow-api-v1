import questionModel from '../dummyModel/QuestionModel';
import userModel from '../dummyModel/UserModel';

const Questions = {
    getAllQuestions : (req, res) => {
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
    },
    getQuestion : (req, res) => {
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
    }, 

    getUserQuestion : (req, res) => {
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
    },
    
    createQuestion : (req, res) => {
      res.json('create question')
    }


}

export default Questions;