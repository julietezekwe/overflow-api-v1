import questionModel from '../dummyModel/QuestionModel';
import userModel from '../dummyModel/UserModel';
import pool from "../db/dbConfig";
import queries from "./queries";

const { findAll, findWithCondition, make, deleteOne } = queries;

class Questions {   
     static getAllQuestions(req, res){
        findAll("Questions").then(questions => {
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
        findWithCondition("Questions", `id = ${questionId}`).then(question => {
            if(question.rowCount > 0){
                 findWithCondition("Answers", `question_id = ${questionId}`).then(answers => {
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
         findWithCondition("Questions", `user_id = ${userId}`).then(questions => {
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
      make("insert", "Questions", "title, question, user_id", "$1, $2, $3", [title, body, id])
            return res.status(201).json({
                message: 'succefully created a question',
               error: false
              });      
    }
    static updateQuestion(req, res) {
        const {questionId } = req.params;
        const {id, email } = req.authData;
        const { title, body } = req.body;
  
        make("update", "Questions", "title = $1, question = $2", "id = $3 AND user_id = $4", [title, body, questionId, id])
        .then(response => {
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
         deleteOne("Questions", "id = $1 AND user_id = $2", [questionId, id]).then(response => {
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

     static getQuestionsWithMostAnswers(req, res){
        
         findAll("Questions", "answers DESC").then(questions => {
             return res.status(201).json({
                 quesions : questions.rows
             })
         }).catch(err => {
             if(err){
                 return res.status(400).json({
                    error: true,
                     message: "failed"
                 })
             }
         })
     }

     static searchQuestions(req, res){
         const { searchString } = req.params;
        const query = {
            text: "SELECT * FROM Questions WHERE question ILIKE $1 ORDER BY answers DESC",
            values: [`%${searchString}%`]
        }
       console.log(`%${searchString}%`)
        pool.query(query)
        // findWithCondition("Questions", `question ILIKE %${searchString}%`, "answers DESC" )
        .then(questions => {
            
            return res.status(201).json({
                quesions : questions.rows
            })
        }).catch(err => {
            if(err){
                return res.status(404).json({
                   error: true,
                    message: "no question found"
                })
            }
        })
    }
}

export default Questions;