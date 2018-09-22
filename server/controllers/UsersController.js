import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../dummyModel/UserModel';

const secret = "u1lJdh";
const lastIndexOf = array => array[array.length - 1];
class Users {
    static getAllUsers(req, res){
        return res.status(201).json({
            userModel,
            message: 'success',
            
          });  
    }
    static getUser(req, res){ 
        const { userId } = req.params;
        let found = false;
        let userDetail;
           userModel.map(user => {  
            // found a user
             if(user.id === Number(userId)){                  
                found = true;
                userDetail = {
                    id: user.id,
                    name: user.name,
                    email : user.email,
                    joined: user.joined
                }; 
                return res.status(201).json({
                    userDetail,
                    message: 'success',
                    
                  });        
              }
            });
            // wrong id
            if(!found){
                return res.status(404).json({
                    message: 'No user found',
                    error: true,
            
                  });
            }
     
    }
    static registerUsers(req, res){
        const {name, email, password } = req.body;
        let found = false;
         userModel.map(user => {
    //    check if email is taken
            if(user.email === email){
                found = true;
                    return res.status(400).json({
                    message: "email already exist",
                    error: true
                });
            } 
        
          })   
       
          if(!found){
            // push to the model
            userModel.push({
                id: userModel.length + 1,
                name,
                email,
                password : bcrypt.hashSync(password, 10),
                joined: new Date()
            });
              
            const userDetail = lastIndexOf(userModel);
              // Assign token to user for 30sec
            const token = jwt.sign(userDetail, secret, { expiresIn: '30s' });
             // Success message
           
            return res.status(201).json({
                userDetail,
                message: 'Signed up successfully',
                token
              });
            }   
    }
    static loginUser(req, res){
        const {name, email, password } = req.body;
           let found = false;
           let userDetail;
           userModel.map(user => {       
             if(user.email === email ) { 
                found = true;
                userDetail = user;            
              }
            });

            //user found
            if(found){
                if(bcrypt.compareSync(password, userDetail.password)){
                    // Assign token to user for 30sec
                    const token = jwt.sign(userDetail, secret, { expiresIn: '1hr' });
                    // Success message
                    
                    return res.status(201).json({
                        userDetail,
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
            } else {
            //    user does not exist
                return res.status(400).json({
                    message: 'User does not exist',
                    error: true
                });
            }
    }
}



export default Users;