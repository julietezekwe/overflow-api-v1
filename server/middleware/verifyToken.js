import jwt from 'jsonwebtoken';
import models from '../dummyModel/UserModel';

const secret = "u1lJdh";
const { User } = models;
class verifyToken{
    static authenticate(req, res, next){
            // Get auth header value
            const bearerHeader = req.headers.authorization;
          
            if (!bearerHeader) {
              // Forbidden
              return res.status(403).json({
                message: 'Kindly sign in bearer error',
                error: true
              });
            }
            req.token = bearerHeader;
            
            jwt.verify(req.token, secret, (err, authData) => {
              
               if (err) {
                // Wrong token
                return res.status(403).json({
                  message: 'Kindly sign in',
                  error: true
                });
              }
             req.authData = authData
             
            //   = authData;
             
          });
          return next();
        }
     
}

export default verifyToken;

