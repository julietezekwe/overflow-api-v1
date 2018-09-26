import pool from './dbConfig';
import bcrypt from 'bcrypt';

const migrateUser = (id, name, email, password) => {
   
    
    const hash =  bcrypt.hashSync(password, 10);
   
    const query = {
        text: 'INSERT INTO Users(id, name, email, password) VALUES($1, $2, $3, $4) RETURNING name, email, joined',
        values: [id, name, email, hash],
      };
      pool.query(query);
}
   
const migrateQuestions = (id, title, question, userId) => {

    
   
   const query = {
        text: 'INSERT INTO Questions(id, title, question, user_id) VALUES($1, $2, $3, $4) RETURNING *',
        values: [id, title, question, userId],
      };
      pool.query(query);
}
    
const migrateAnswers = (id, answer, questionId, userId, userName) => {
    const query = {
        text: 'INSERT INTO Answers(id, answer, question_id, user_id, user_name) VALUES($1, $2, $3, $4, $5) RETURNING *',
        values: [id, answer, questionId, userId, userName],
      };
      pool.query(query);
} 

migrateUser(1, "juliet", "juliet@gmail.com", "juliet");
migrateUser(2, "chidimma", "chidimma@gmail.com", "chidimma");
migrateUser(3, "chinedu", "chinedu@gmail.com", "chinedu");

migrateQuestions(1, "title1", "question 1", 1);
migrateQuestions(2, "title2", "question 2", 2);
migrateQuestions(3, "title3", "question 3", 1);
migrateQuestions(4, "title4", "question 4", 2);

migrateAnswers(1, "answer to question 2", 2, 1, "juliet");
migrateAnswers(2, "answer to question 1", 1, 2, "chidimma");
migrateAnswers(3, "answer to question 1", 3, 2, "chidimma");

pool.query('ALTER SEQUENCE users_id_seq RESTART WITH 100');
pool.query('ALTER SEQUENCE answers_id_seq RESTART WITH 100');
pool.query('ALTER SEQUENCE questions_id_seq RESTART WITH 100');

    
