'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _QuestionModel = require('../dummyModel/QuestionModel');

var _QuestionModel2 = _interopRequireDefault(_QuestionModel);

var _UserModel = require('../dummyModel/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _AnswerModel = require('../dummyModel/AnswerModel');

var _AnswerModel2 = _interopRequireDefault(_AnswerModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Answers = function () {
    function Answers() {
        _classCallCheck(this, Answers);
    }

    _createClass(Answers, null, [{
        key: 'createAnswer',
        value: function createAnswer(req, res) {
            var questionId = req.params.questionId;
            var _req$authData = req.authData,
                id = _req$authData.id,
                name = _req$authData.name;
            var body = req.body.body;
            // check if question exists

            var found = false;
            _QuestionModel2.default.map(function (question) {
                console.log(question.id, questionId);
                if (question.id === Number(questionId)) {
                    found = true;
                    _AnswerModel2.default.push({
                        id: _AnswerModel2.default.length + 1,
                        questionId: Number(questionId),
                        userId: id,
                        posterName: name,
                        body: body,
                        created_at: new Date()
                    });

                    return res.status(201).json({
                        message: 'succefully created answer',
                        error: false,
                        answer: _AnswerModel2.default
                    });
                } else if (!found) {
                    return res.status(404).json({
                        message: 'this question does not exist',
                        error: true
                    });
                }
            });

            // push to the model
        }
    }, {
        key: 'getAnswer',
        value: function getAnswer(req, res) {
            var questionId = req.params.questionId;

            var found = false;
            var answers = [];
            _AnswerModel2.default.map(function (answer) {
                // found a question
                if (answer.questionId === Number(questionId)) {
                    found = true;
                    answers.push(answer);
                }
            });
            if (found) {
                return res.status(201).json({
                    answers: answers,
                    message: 'Success'

                });
            }
            // wrong id
            if (!found) {
                return res.status(400).json({
                    message: 'no answers found',
                    error: true

                });
            }
        }
    }]);

    return Answers;
}();

exports.default = Answers;