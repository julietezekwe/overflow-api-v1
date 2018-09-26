import questionModel from '../dummyModel/QuestionModel';
import userModel from '../dummyModel/UserModel';
import pool from "../db/dbConfig";


class Questions {   
     static getAllQuestions(req, res){
        const query = {
            text : "SELECT * FROM Questions"
        }
        pool.query(query).then(questions => {
            if(questions.rowCount > 0){
                return res.status(201).json({
                    questionModel: questions.rows,
                    message: 'success'            
                  }); 
            } else {
                return res.status(400).json({
                    message: 'no questions found',
                    error: true,
            
                  });
            } 
        });
       
    }
    static getQuestion(req, res){
       const { questionId } = req.params;
       let answers;
        const query = {text: "SELECT * FROM Questions WHERE id = $1", values: [questionId] }
        pool.query(query).then(question => {
            if(question.rowCount > 0){
                pool.query({ text: "SELECT * FROM Answers WHERE question_id = $1", values: [questionId]})
                .then(answers => {
                    answers.rowCount > 0 ? answers = answers.rows : answers = [];
                    return res.status(201).json({
                       questionDetail: question.rows[0], answers, message: 'Success',
                   }); 
            });                
            } else {
                return res.status(400).json({ message: 'no questions found', error: true,
                  });
            }    
        })
  
             
    }
    static getUserQuestion(req, res){
        const { userId } = req.params;
         const query = {
             text: "SELECT * FROM Questions WHERE user_id = $1",
             values: [userId]
         }
         pool.query(query).then(questions => {
             if(questions.rowCount > 0){
                return res.status(201).json({
                    questions: questions.rows,
                    user: req.authData,
                    message: 'Success',
                    
                }); 
              }
             else 
             {
                return res.status(400).json({
                    message: 'no questions found',
                    error: true,
            
                });
             }    
         })
   
              
     }
    
    
    static createQuestion(req, res) {
        const {id, email } = req.authData;
        const { title, body } = req.body;
        const query = {
            text : "INSERT INTO Questions(title, question, user_id) VALUES($1, $2, $3)",
            values: [title, body, id]
        }
        pool.query(query).then(console.log);
            
            return res.status(201).json({
                message: 'succefully created a question',
               error: false
              });      
    }
    static updateQuestion(req, res) {
        const {questionId } = req.params;
        const {id, email } = req.authData;
        const { title, body } = req.body;
        const query = {
            text : "UPDATE Questions SET title = $1, question = $2 WHERE id = $3 AND user_id = $4",
            values: [title, body, questionId, id]
        }
        pool.query(query).then(response => {
            if(response.rowCount > 0){
                return res.status(201).json({
                    message: 'succefully updated a question',
                   error: false
                  });    
            }
            else{
                return res.status(401).json({
                    error: true,
                    message: 'You have no question with this ID.'
                    
                }); 
            }
        }).catch(console.log);
            
             
    }
    static deleteQuestion(req, res){
        const { questionId } = req.params;
        const { id } = req.authData;
        ;
         let questionDetail;

         const query = {
             text: "DELETE FROM Questions WHERE id = $1 AND user_id = $2",
             values: [questionId, id]
         };

         pool.query(query).then(response => {
             if(response.rowCount > 0){
                return res.status(201).json({
                     message: 'Deleted successfully'
                     
                   }); 
                }  
            else {       
                return res.status(401).json({
                        error: true,
                        message: 'You have no question with this ID.'
                        
                    }); 
             }
         })
     }
}

export default Questions;