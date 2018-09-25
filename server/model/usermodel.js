import pool from "../db/dbConfig";

const Users = {
    registerAUser : {

    },
    getAllUsersModel: () => {
        let query = {
            text: 'SELECT name, email, joined FROM users',
            }
           pool.query(query).then(users => {
           const Users = users.rows
           console.log(Users)
           });
       
    },
    getAUserModel: (userId) => {
        
        let query = {
            text: 'SELECT name, email, joined FROM users Where id = $1',
            values : [userId]
            }
            
         return   pool.query(query)
       
    }
}
   
    
      
 

 export default Users;