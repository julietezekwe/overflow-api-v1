import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../dummyModel/UserModel';
import pool from '../db/dbConfig';

const secret = "gy8fy nz0093887e";
const lastIndexOf = array => array[array.length - 1];
class Users {
    static getAllUsers(req, res){
        let query = {
            text: 'SELECT name, email, joined FROM users',
            }
           pool.query(query).then(users => {
               if(users.rowCount > 0){
                return res.status(201).json({
                    users: users.rows,
                    message: 'success',
                    
                  });
               }
          
           });
          
    }
    static getUser(req, res){
       
        const { userId } = req.params;
      
        let userDetail;

        let query = {
            text: 'SELECT name, email, joined FROM users Where id = $1',
            values : [userId]
            }
            
         pool.query(query).then(user => {
             if (user.rowCount === 1 ) {
               userDetail = user.rows[0];
               return res.status(201).json({
                userDetail,
                message: 'success',
                
              }); 

             }
             else{
                return res.status(404).json({
                    message: 'No user found',
                    error: true,
            
                  });
             }

         });
       
     
    }
    static registerUsers(req, res){
        const {name, email, password } = req.body;
        
        const hash =  bcrypt.hashSync(password, 10);
       pool.query({
           text: "SELECT email from Users where email = $1",
           values: [email]
       }).then(emailfound => {
           if(emailfound.rowCount === 0){
               console.log(req.body)
            const query = {
                text: 'INSERT INTO Users(name, email, password) VALUES($1, $2, $3) RETURNING name, email, joined',
                values: [name, email, hash],
              };
              
                console.log(req.body)
              pool.query(query).then(user => {
                const userDetail = user.rows[0];
                const {id, name, joined } = userDetail;
                            const authDetail = {
                                id,
                                email,
                                name,
                                joined
                            }
                            const token = jwt.sign(authDetail, secret, { expiresIn: '1hr' });
               
               
                return res.status(201).json({
                    authDetail,
                    message: 'Signed up successfully',
                    token
                  });
    
              })
           }
           else{
            return res.status(400).json({
                message: "email already exist",
                error: true
            });
           }
       })
           
    }
    static loginUser(req, res){
        const {email, password } = req.body;
           let userDetail;   
           const query = {
               text: 'SELECT * FROM users Where email = $1',
               values : [email]
               }
               
            pool.query(query).then(user => {
                if (user.rowCount) {
                    userDetail = user.rows[0];

                    if(bcrypt.compareSync(password, userDetail.password)){
                        // Assign token to user for 30sec
                        const {id, name, joined } = userDetail;
                        const authDetail = {
                            id,
                            email,
                            name,
                            joined
                        }
                        const token = jwt.sign(authDetail, secret, { expiresIn: '1hr' });
                        // Success message
                        
                        return res.status(201).json({
                            message: 'logged in successfully',
                            token
                        });
                    } else{
                        //  invalid password
                        return res.status(400).json({
                            message: 'wrong credentials',
                            error: true
                        });
                    }
                 
   
                } else{
                    //    user does not exist
                    return res.status(400).json({
                        message: 'User does not exist',
                        error: true
                    });
                }
                
   
            });

           

    }
}



export default Users;