import questionModel from '../dummyModel/QuestionModel';
import userModel from '../dummyModel/UserModel';
import answerModel from '../dummyModel/AnswerModel';
class Answers {

   static createAnswer(req, res){
        const { questionId } = req.params;
        const { id } = req.authData;
        const { body } = req.body;
      
            // push to the model
            answerModel.push({
                id: answerModel.length + 1,
                questionId,
                userId :id,
                body,
                created_at: new Date()
            });
            
            return res.status(201).json({
                message: 'succefully created a answer',
               error: false
              }); 
    };
      
    static getAnswer(req, res){
        const { questionId } = req.params;
        let found = false;
        let answers=[];
           answerModel.map(answer => {  
            // found a question
             if(answer.questionId === Number(questionId)){                  
                found = true;
                answers.push(answer); 
                       
              }
            });
            if(found){
                return res.status(201).json({
                    answers,
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
}

export default Answers;