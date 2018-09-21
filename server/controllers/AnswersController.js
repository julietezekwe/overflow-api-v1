import questionModel from '../dummyModel/QuestionModel';
import userModel from '../dummyModel/UserModel';
import answerModel from '../dummyModel/AnswerModel';
class Answers {

   static createAnswer(req, res){
        const { questionId } = req.params;
        const { id, name } = req.authData;
        const { body } = req.body;
            // check if question exists
            let found = false;
            questionModel.map(question => {
                console.log(question.id, questionId)
                if(question.id === Number(questionId)){
                    found = true;
                    answerModel.push({
                        id: answerModel.length + 1,
                        questionId: Number(questionId),
                        userId :id,
                        posterName: name,
                        body,
                        created_at: new Date()
                    });
                    
                    return res.status(201).json({
                        message: 'succefully created answer',
                       error: false,
                      answer: answerModel
                      });
                } 
               else if(!found){
                    return res.status(404).json({
                        message: 'this question does not exist',
                       error: true,
                      });
                }
            });

            // push to the model
            
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
                    message: 'no answers found',
                    error: true,
            
                  });
            }    
    }
}

export default Answers;