;
import pool from "../db/dbConfig";

class Answers {

   static createAnswer(req, res){
        const { questionId } = req.params;
        const { id, name } = req.authData;
        const { body } = req.body;
       
            // check if question exists
        let query = {
                text: "SELECT * FROM Questions WHERE id = $1",
                values: [questionId]
            }
        pool.query(query).then(response => {
            if(response.rowCount > 0 ){
                if(response.rows[0].user_id === id){
                    return res.status(401).json({
                        message: 'You cannot comment on your question',
                       error: true,
                      });
                }
              
                query = {
                    text: "INSERT INTO Answers(answer, question_id, user_id, user_name) VALUES($1, $2, $3, $4) RETURNING *",
                    values: [body, questionId, id, name]
                }
                pool.query(query).then(answer => {
                   pool.query({
                       text: "UPDATE Questions SET answers= answers+1 WHERE id = $1",
                       values : [questionId]
                   });
                    return res.status(201).json({
                        message: 'succefully created answer',
                       error: false
                      });
                })
            }
            else{
                return res.status(404).json({
                    message: 'this question does not exist',
                   error: true,
                  });
            }
        })
       
    }

    static updateAnswer(req, res) {
        const {questionId, answerId } = req.params;
        const {id, email } = req.authData;
        const { body } = req.body;
        let query = {
            text: "SELECT * FROM Questions WHERE id = $1",
            values: [questionId]
        }
        pool.query(query).then(question => {
           if(question.rowCount > 0 && question.rows[0].user_id === id){
              
               console.log("I own the question")
               query = {
                text : "UPDATE Answers SET accepted = $1 WHERE id = $2",
                values: [ Number(body), answerId]
              }
              pool.query(query).then(response => {
                if(response.rowCount > 0){
                    return res.status(201).json({
                        message: 'You have accepted this answer',
                       error: false
                      });    
                }
              })
           }else{
            query = {
                text : "UPDATE Answers SET answer = $1 WHERE id = $2 AND user_id = $3",
                values: [body, answerId, id]
            }
            pool.query(query).then(response => {
                if(response.rowCount > 0){
                    return res.status(201).json({
                        message: 'succefully updated an answer',
                       error: false
                      });    
                }
                else{
                    return res.status(401).json({
                        error: true,
                        message: 'You have no answer with this ID.'
                        
                    }); 
                }
            }).catch(console.log);
                
                 
           }
        });
        
        
        
        
       
    }

    static getAnswer(req, res){
        const { questionId } = req.params;              
         const query = {
             text: "SELECT * FROM Answers WHERE question_id = $1",
             values: [questionId]
         }
         pool.query(query).then(answers => {

             if(answers.rowCount > 0){
                     return res.status(201).json({
 
                         answers: answers.rows,
                         message: 'Success',
                         
                       });             
              }
             else {
                 return res.status(400).json({
                     message: 'no answers found',
                     error: true,
             
                   });
             }    
         });
   
        } 

        static commentOnAnswer(req, res){
            const { answerId } = req.params;
            const { id, name } = req.authData;
            const { body } = req.body;
           
                // check if question exists
            let query = {
                    text: "SELECT * FROM Answers WHERE id = $1",
                    values: [answerId]
                }
            pool.query(query).then(response => {
                if(response.rowCount > 0 ){
                    if(response.rows[0].user_id === id){
                        return res.status(401).json({
                            message: 'You cannot comment on your answer',
                           error: true,
                          });
                    }
                  
                    query = {
                        text: "INSERT INTO Comments(comment, answer_id, user_id, user_name) VALUES($1, $2, $3, $4) RETURNING *",
                        values: [body,answerId, id, name]
                    }
                    pool.query(query).then(answer => {
                       pool.query({
                           text: "UPDATE Answers SET comments= comments+1 WHERE id = $1",
                           values : [answerId]
                       });
                        return res.status(201).json({
                            message: 'succefully created comment',
                           error: false
                          });
                    })
                }
                else{
                    return res.status(404).json({
                        message: 'this answer does not exist',
                       error: true,
                      });
                }
            })
           
        }

        static updateLike(req, res) {
            const { answerId } = req.params;
        
            const { id } = req.authData;
            const { body } = req.body;
            let query = {
                text: "SELECT * FROM Likes WHERE user_id = $1 AND answer_id = $2",
                values: [id, answerId]
            }
            pool.query(query).then(likes => {
               if(likes.rowCount > 0 ){
             
                 const like_id = likes.rows[0].id;
                  
                   query = {
                    text : "UPDATE Likes SET like_or_dislike = $1 WHERE id = $2",
                    values: [ Number(body), like_id]
                  }
                  pool.query(query).then(response => {
                    if(response.rowCount > 0){
                        return res.status(201).json({
                            message: 'Success',
                           error: false
                          });    
                    }
                  })
               }else{
                query = {
                    text : "INSERT INTO Likes(answer_id, user_id, like_or_dislike) VALUES ($1, $2, $3)",
                    values: [answerId, id, Number(body)]
                }
                pool.query(query).then(response => {
                    if(response.rowCount > 0){
                        return res.status(201).json({
                            message: 'Success',
                           error: false
                          });    
                    }
                    else{
                        return res.status(401).json({
                            error: true,
                            message: 'there is no answer with this ID.'
                            
                        }); 
                    }
                })
                    
                     
               }
            });
            
           
        }
    
}

export default Answers;