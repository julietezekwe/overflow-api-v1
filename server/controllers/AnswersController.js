import pool from "../db/dbConfig";
import queries from "./queries";

const { findAll, findWithCondition, update, insert } = queries;
class Answers {

   static createAnswer(req, res){
        const { questionId } = req.params;
        const { id, name } = req.authData;
        const { body } = req.body;
        findWithCondition("Questions", `id=${questionId}`).then(response => {
            if(response.rowCount > 0 ){
                if(response.rows[0].user_id === id){
                    return res.status(401).json({
                        message: 'You cannot comment on your question',
                       error: true,
                      });
                }
               
                insert('Answers', "answer, question_id, user_id, user_name", "$1, $2, $3, $4", [body, questionId, id, name])
                .then(answer => {
                   update("Questions", "answers= answers+1", `id = ${questionId}`);
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
        findWithCondition("Questions", `id=${questionId}`).then(question => {
           if(question.rowCount > 0 && question.rows[0].user_id === id){
             update("Answers", `accepted = $1`, `id = $2`, [Number(body), answerId]).then(response => {
                if(response.rowCount > 0){
                    return res.status(201).json({
                        message: 'You have accepted this answer',
                       error: false
                      });    
                }
              })
           }else{
            update("Answers", `answer = $1`, `id = $2 AND user_id = $3`, [body, answerId, id]).then(response => {
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
        findWithCondition("Questions", `id=${questionId}`)
        .then(answers => {

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
         /**
          * @static
          * @param {*} res
          * @param {*} req
          * @description creates an answer to a question
          * @returns success message
          */

            const { answerId } = req.params;
            const { id, name } = req.authData;
            const { body } = req.body;
           
                // check if question exists
                findWithCondition("Questions", `id=${answerId}`)
                .then(response => {
                if(response.rowCount > 0 ){
                    if(response.rows[0].user_id === id){
                        return res.status(401).json({
                            message: 'You cannot comment on your answer',
                           error: true,
                          });
                    }

                    insert("Comments", "comment, answer_id, user_id, user_name", "$1, $2, $3, $4", [body,answerId, id, name]).then(answer => {
                       update("Comments", "comments = comments+1", "id = $1", [answerId])
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
            findWithCondition("Likes", `user_id=${id} AND answer_id = ${answerId}`).then(likes => {
               if(likes.rowCount > 0 ){
             
                 const like_id = likes.rows[0].id;
    
                  update("Likes", "like_or_dislike", "id = $2", [ Number(body), like_id]).then(response => {
                    if(response.rowCount > 0){
                        return res.status(201).json({
                            message: 'Success',
                           error: false
                          });    
                    }
                  })
               }else{
            
                insert("Likes", "answer_id, user_id, like_or_dislike", "$1, $2, $3", [answerId, id, Number(body)]).then(response => {
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