import pool from './dbConfig';
import bcrypt from 'bcrypt';

const migrateUser = (name, email, password) => {
   
    
    const hash =  bcrypt.hashSync(password, 10);
   
    const query = {
        text: 'INSERT INTO Users(name, email, password) VALUES($1, $2, $3) RETURNING name, email, joined',
        values: [name, email, hash],
      };
      pool.query(query).then(console.log).catch(console.log);
}
   
const migrateQuestions = (title, question, userId) => {

    
   
   const query = {
        text: 'INSERT INTO Questions(title, question, user_id) VALUES($1, $2, $3) RETURNING *',
        values: [title, question, userId],
      };
      pool.query(query).then(console.log).catch(console.log);
}
    
const migrateAnswers = (answer, questionId, userId, userName) => {
    const query = {
        text: 'INSERT INTO Answers(answer, question_id, user_id, user_name) VALUES($1, $2, $3, $4) RETURNING *',
        values: [answer, questionId, userId, userName],
      };
      pool.query(query).then(console.log).catch(console.log);
} 

migrateUser("juliet", "juliet@gmail.com", "juliet");
migrateUser("chidimma", "chidimma@gmail.com", "chidimma");
migrateUser("chinedu", "chinedu@gmail.com", "chinedu");

migrateQuestions("title1", "question 1", 1);
migrateQuestions("title2", "question 2", 2);
migrateQuestions("title3", "question 3", 1);
migrateQuestions("title4", "question 4", 2);

migrateAnswers("answer to question 2", 2, 1, "juliet")
migrateAnswers("answer to question 1", 1, 2, "chidimma")
migrateAnswers("answer to question 1", 3, 2, "chidimma")
    
    
