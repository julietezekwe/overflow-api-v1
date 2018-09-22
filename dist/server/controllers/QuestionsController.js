'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _QuestionModel = require('../dummyModel/QuestionModel');

var _QuestionModel2 = _interopRequireDefault(_QuestionModel);

var _UserModel = require('../dummyModel/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Questions = function () {
    function Questions() {
        _classCallCheck(this, Questions);
    }

    _createClass(Questions, null, [{
        key: 'getAllQuestions',
        value: function getAllQuestions(req, res) {
            if (_QuestionModel2.default.length > 0) {
                return res.status(201).json({
                    questionModel: _QuestionModel2.default,
                    message: 'success'
                });
            } else {
                return res.status(400).json({
                    message: 'no questions found',
                    error: true

                });
            }
        }
    }, {
        key: 'getQuestion',
        value: function getQuestion(req, res) {
            var questionId = req.params.questionId;


            var found = false;
            var questionDetail = void 0;
            _QuestionModel2.default.map(function (question) {
                // found a question
                if (question.id === Number(questionId)) {
                    found = true;
                    questionDetail = question;
                    return res.status(201).json({
                        questionDetail: questionDetail,
                        message: 'Success'

                    });
                }
            });
            // wrong id
            if (!found) {
                return res.status(400).json({
                    message: 'no questions found',
                    error: true

                });
            }
        }
    }, {
        key: 'getUserQuestion',
        value: function getUserQuestion(req, res) {
            var userId = req.params.userId;

            var found = false;
            var questions = [];
            _QuestionModel2.default.map(function (question) {
                // found a question
                if (question.userId === Number(userId)) {
                    found = true;
                    questions.push(question);
                }
            });
            if (found) {
                return res.status(201).json({
                    questions: questions,
                    user: req.authData,
                    message: 'Success'

                });
            }
            // wrong id
            if (!found) {
                return res.status(400).json({
                    message: 'no questions found',
                    error: true

                });
            }
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

            // push to the model

            _QuestionModel2.default.push({
                id: _QuestionModel2.default.length + 1,
                title: title,
                body: body,
                userId: id,
                created_at: new Date()
            });

            return res.status(201).json({
                message: 'succefully created a question',
                error: false
            });
        }
    }, {
        key: 'deleteQuestion',
        value: function deleteQuestion(req, res) {
            var questionId = req.params.questionId;
            var id = req.authData.id;

            var found = false;
            var questionDetail = void 0;
            _QuestionModel2.default.map(function (question, index) {
                // found a question
                if (question.id === Number(questionId)) {

                    found = true;
                    if (question.userId === id) {
                        _QuestionModel2.default.splice(index, 1);
                        return res.status(201).json({
                            questionModel: _QuestionModel2.default,
                            user: req.authData,
                            message: 'Deleted successfully'

                        });
                    } else {
                        return res.status(401).json({
                            error: true,
                            message: 'You cant delete another users question'

                        });
                    }
                }
            });
            // wrong id
            if (!found) {
                return res.status(400).json({
                    message: 'no question found',
                    error: true

                });
            }
        }
    }]);

    return Questions;
}();

exports.default = Questions;