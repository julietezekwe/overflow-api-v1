'use strict';

var _dbConfig = require('./dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var migrateUser = function migrateUser(id, name, email, password) {

    var hash = _bcrypt2.default.hashSync(password, 10);

    var query = {
        text: 'INSERT INTO Users(id, name, email, password) VALUES($1, $2, $3, $4) RETURNING name, email, joined',
        values: [id, name, email, hash]
    };
    _dbConfig2.default.query(query);
};

var migrateQuestions = function migrateQuestions(id, title, question, userId) {

    var query = {
        text: 'INSERT INTO Questions(id, title, question, user_id) VALUES($1, $2, $3, $4) RETURNING *',
        values: [id, title, question, userId]
    };
    _dbConfig2.default.query(query);
};

var migrateAnswers = function migrateAnswers(id, answer, questionId, userId, userName) {
    var query = {
        text: 'INSERT INTO Answers(id, answer, question_id, user_id, user_name) VALUES($1, $2, $3, $4, $5) RETURNING *',
        values: [id, answer, questionId, userId, userName]
    };
    _dbConfig2.default.query(query);
};

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

_dbConfig2.default.query('ALTER SEQUENCE users_id_seq RESTART WITH 100');
_dbConfig2.default.query('ALTER SEQUENCE answers_id_seq RESTART WITH 100');
_dbConfig2.default.query('ALTER SEQUENCE questions_id_seq RESTART WITH 100');