import questionModel from '../dummyModel/QuestionModel';
import userModel from '../dummyModel/UserModel';
import answerModel from '../dummyModel/AnswerModel';
const Answers = {

    createAnswer : (req, res) => {
       
    },
      
    getAnswer : (req, res) => {
        const { questionId } = req.params;
        console.log(answerModel)
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