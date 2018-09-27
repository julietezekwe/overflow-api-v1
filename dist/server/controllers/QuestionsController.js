'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _QuestionModel = require('../dummyModel/QuestionModel');

var _QuestionModel2 = _interopRequireDefault(_QuestionModel);

var _UserModel = require('../dummyModel/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _dbConfig = require('../db/dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Questions = function () {
    function Questions() {
        _classCallCheck(this, Questions);
    }

    _createClass(Questions, null, [{
        key: 'getAllQuestions',
        value: function getAllQuestions(req, res) {
            var query = {
                text: "SELECT * FROM Questions"
            };
            _dbConfig2.default.query(query).then(function (questions) {
                if (questions.rowCount > 0) {
                    return res.status(201).json({
                        questionModel: questions.rows,
                        message: 'success'
                    });
                } else {
                    return res.status(400).json({
                        message: 'no questions found',
                        error: true

                    });
                }
            });
        }
    }, {
        key: 'getQuestion',
        value: function getQuestion(req, res) {
            var questionId = req.params.questionId;

            var answers = void 0;
            var query = { text: "SELECT * FROM Questions WHERE id = $1", values: [questionId] };
            _dbConfig2.default.query(query).then(function (question) {
                if (question.rowCount > 0) {
                    _dbConfig2.default.query({ text: "SELECT * FROM Answers WHERE question_id = $1", values: [questionId] }).then(function (answers) {
                        answers.rowCount > 0 ? answers = answers.rows : answers = [];
                        return res.status(201).json({
                            questionDetail: question.rows[0], answers: answers, message: 'Success'
                        });
                    });
                } else {
                    return res.status(400).json({ message: 'no questions found', error: true
                    });
                }
            });
        }
    }, {
        key: 'getUserQuestion',
        value: function getUserQuestion(req, res) {
            var userId = req.params.userId;

            var query = {
                text: "SELECT * FROM Questions WHERE user_id = $1",
                values: [userId]
            };
            _dbConfig2.default.query(query).then(function (questions) {
                if (questions.rowCount > 0) {
                    return res.status(201).json({
                        questions: questions.rows,
                        user: req.authData,
                        message: 'Success'

                    });
                } else {
                    return res.status(400).json({
                        message: 'no questions found',
                        error: true

                    });
                }
            });
        }
    }, {
        key: 'createQuestion',
        value: function createQuestion(req, res) {
            var _req$authData = req.authData,
                id = _req$authData.id,
                email = _req$authData.email;
            var _req$body = req.body,
                title = _req$body.title,
                body = _req$body.body;

            var query = {
                text: "INSERT INTO Questions(title, question, user_id) VALUES($1, $2, $3)",
                values: [title, body, id]
            };
            _dbConfig2.default.query(query).then(console.log);

            return res.status(201).json({
                message: 'succefully created a question',
                error: false
            });
        }
    }, {
        key: 'updateQuestion',
        value: function updateQuestion(req, res) {
            var questionId = req.params.questionId;
            var _req$authData2 = req.authData,
                id = _req$authData2.id,
                email = _req$authData2.email;
            var _req$body2 = req.body,
                title = _req$body2.title,
                body = _req$body2.body;

            var query = {
                text: "UPDATE Questions SET title = $1, question = $2 WHERE id = $3 AND user_id = $4",
                values: [title, body, questionId, id]
            };
            _dbConfig2.default.query(query).then(function (response) {
                if (response.rowCount > 0) {
                    return res.status(201).json({
                        message: 'succefully updated a question',
                        error: false
                    });
                } else {
                    return res.status(401).json({
                        error: true,
                        message: 'You have no question with this ID.'

                    });
                }
            }).catch(console.log);
        }
    }, {
        key: 'deleteQuestion',
        value: function deleteQuestion(req, res) {
            var questionId = req.params.questionId;
            var id = req.authData.id;

            ;
            var questionDetail = void 0;

            var query = {
                text: "DELETE FROM Questions WHERE id = $1 AND user_id = $2",
                values: [questionId, id]
            };

            _dbConfig2.default.query(query).then(function (response) {
                if (response.rowCount > 0) {
                    return res.status(201).json({
                        message: 'Deleted successfully'

                    });
                } else {
                    return res.status(401).json({
                        error: true,
                        message: 'You have no question with this ID.'

                    });
                }
            });
        }
    }, {
        key: 'getQuestionsWithMostAnswers',
        value: function getQuestionsWithMostAnswers(req, res) {
            var query = {
                text: "SELECT * FROM Questions ORDER BY answers DESC"
            };
            _dbConfig2.default.query(query).then(function (questions) {
                return res.status(201).json({
                    quesions: questions.rows
                });
            }).catch(function (err) {
                if (err) {
                    return res.status(400).json({
                        error: true,
                        message: "failed"
                    });
                }
            });
        }
    }, {
        key: 'searchQuestions',
        value: function searchQuestions(req, res) {
            var searchString = req.params.searchString;

            var query = {
                text: "SELECT * FROM Questions WHERE question LIKE $1 ORDER BY answers DESC",
                values: ['%' + searchString + '%']
            };

            _dbConfig2.default.query(query).then(function (questions) {

                return res.status(201).json({
                    quesions: questions.rows
                });
            }).catch(function (err) {
                if (err) {
                    return res.status(404).json({
                        error: true,
                        message: "no question found"
                    });
                }
            });
        }
    }]);

    return Questions;
}();

exports.default = Questions;