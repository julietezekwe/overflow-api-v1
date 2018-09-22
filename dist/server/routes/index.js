'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _UsersController = require('../controllers/UsersController');

var _UsersController2 = _interopRequireDefault(_UsersController);

var _QuestionsController = require('../controllers/QuestionsController');

var _QuestionsController2 = _interopRequireDefault(_QuestionsController);

var _AnswersController = require('../controllers/AnswersController');

var _AnswersController2 = _interopRequireDefault(_AnswersController);

var _userValidator = require('../middleware/userValidator');

var _userValidator2 = _interopRequireDefault(_userValidator);

var _questionValidator = require('../middleware/questionValidator');

var _questionValidator2 = _interopRequireDefault(_questionValidator);

var _answerValidator = require('../middleware/answerValidator');

var _answerValidator2 = _interopRequireDefault(_answerValidator);

var _verifyToken = require('../middleware/verifyToken');

var _verifyToken2 = _interopRequireDefault(_verifyToken);

var _paramsChecker = require('../middleware/paramsChecker');

var _paramsChecker2 = _interopRequireDefault(_paramsChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//destructure controllers
var getAllUsers = _UsersController2.default.getAllUsers,
    registerUsers = _UsersController2.default.registerUsers,
    loginUser = _UsersController2.default.loginUser,
    getUser = _UsersController2.default.getUser;
var getAllQuestions = _QuestionsController2.default.getAllQuestions,
    getQuestion = _QuestionsController2.default.getQuestion,
    createQuestion = _QuestionsController2.default.createQuestion,
    getUserQuestion = _QuestionsController2.default.getUserQuestion,
    deleteQuestion = _QuestionsController2.default.deleteQuestion;
var createAnswer = _AnswersController2.default.createAnswer,
    getAnswer = _AnswersController2.default.getAnswer;

//  destructure middlewares

var userSignUp = _userValidator2.default.userSignUp,
    userLogin = _userValidator2.default.userLogin;
var createAnswerValidator = _answerValidator2.default.createAnswerValidator;
var createQuestionValidator = _questionValidator2.default.createQuestionValidator;
var authenticate = _verifyToken2.default.authenticate;
var idChecker = _paramsChecker2.default.idChecker;

// user endpoints

router.get('/auth/users', getAllUsers);
router.post('/auth/signup', userSignUp, registerUsers);
router.post('/auth/login', userLogin, loginUser);
router.get('/auth/:userId', idChecker, getUser);

// Qustion and answer endpoints
router.get('/questions', getAllQuestions);
router.get('/question/:questionId', idChecker, getQuestion);
router.get('/question/:userId/questions', authenticate, idChecker, getUserQuestion);
router.get('/question/:questionId/answers', idChecker, getAnswer);
router.post('/question', createQuestionValidator, authenticate, createQuestion);
router.post('/question/:questionId/answer', idChecker, createAnswerValidator, authenticate, createAnswer);
router.delete('/question/:questionId', idChecker, authenticate, deleteQuestion);

exports.default = router;