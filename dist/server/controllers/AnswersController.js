"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dbConfig = require("../db/dbConfig");

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;

var Answers = function () {
    function Answers() {
        _classCallCheck(this, Answers);
    }

    _createClass(Answers, null, [{
        key: "createAnswer",
        value: function createAnswer(req, res) {
            var questionId = req.params.questionId;
            var _req$authData = req.authData,
                id = _req$authData.id,
                name = _req$authData.name;
            var body = req.body.body;

            // check if question exists

            var query = {
                text: "SELECT * FROM Questions WHERE id = $1",
                values: [questionId]
            };
            _dbConfig2.default.query(query).then(function (response) {
                if (response.rowCount > 0) {
                    if (response.rows[0].user_id === id) {
                        return res.status(401).json({
                            message: 'You cannot comment on your question',
                            error: true
                        });
                    }

                    query = {
                        text: "INSERT INTO Answers(answer, question_id, user_id, user_name) VALUES($1, $2, $3, $4) RETURNING *",
                        values: [body, questionId, id, name]
                    };
                    _dbConfig2.default.query(query).then(function (answer) {
                        _dbConfig2.default.query({
                            text: "UPDATE Questions SET answers= answers+1 WHERE id = $1",
                            values: [questionId]
                        });
                        return res.status(201).json({
                            message: 'succefully created answer',
                            error: false
                        });
                    });
                } else {
                    return res.status(404).json({
                        message: 'this question does not exist',
                        error: true
                    });
                }
            });
        }
    }, {
        key: "updateAnswer",
        value: function updateAnswer(req, res) {
            var _req$params = req.params,
                questionId = _req$params.questionId,
                answerId = _req$params.answerId;
            var _req$authData2 = req.authData,
                id = _req$authData2.id,
                email = _req$authData2.email;
            var body = req.body.body;

            var query = {
                text: "SELECT * FROM Questions WHERE id = $1",
                values: [questionId]
            };
            _dbConfig2.default.query(query).then(function (question) {
                if (question.rowCount > 0 && question.rows[0].user_id === id) {

                    console.log("I own the question");
                    query = {
                        text: "UPDATE Answers SET accepted = $1 WHERE id = $2",
                        values: [1, answerId]
                    };
                    _dbConfig2.default.query(query).then(function (response) {
                        if (response.rowCount > 0) {
                            return res.status(201).json({
                                message: 'You have accepted this answer',
                                error: false
                            });
                        }
                    });
                } else {
                    query = {
                        text: "UPDATE Answers SET answer = $1 WHERE id = $2 AND user_id = $3",
                        values: [body, answerId, id]
                    };
                    _dbConfig2.default.query(query).then(function (response) {
                        if (response.rowCount > 0) {
                            return res.status(201).json({
                                message: 'succefully updated an answer',
                                error: false
                            });
                        } else {
                            return res.status(401).json({
                                error: true,
                                message: 'You have no answer with this ID.'

                            });
                        }
                    }).catch(console.log);
                }
            });
        }
    }, {
        key: "getAnswer",
        value: function getAnswer(req, res) {
            var questionId = req.params.questionId;

            var query = {
                text: "SELECT * FROM Answers WHERE question_id = $1",
                values: [questionId]
            };
            _dbConfig2.default.query(query).then(function (answers) {

                if (answers.rowCount > 0) {
                    return res.status(201).json({

                        answers: answers.rows,
                        message: 'Success'

                    });
                } else {
                    return res.status(400).json({
                        message: 'no answers found',
                        error: true

                    });
                }
            });
        }
    }]);

    return Answers;
}();

exports.default = Answers;