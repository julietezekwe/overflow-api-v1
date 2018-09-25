import express from 'express';
import Users from '../controllers/UsersController';
import Questions from '../controllers/QuestionsController';
import Answers from '../controllers/AnswersController';
import userValidator from '../middleware/userValidator';
import questionValidator from '../middleware/questionValidator';
import answerValidator from '../middleware/answerValidator';
import verifyToken from '../middleware/verifyToken';
import paramsChecker from '../middleware/paramsChecker';

const router = express.Router();

//destructure controllers
const { getAllUsers, registerUsers, loginUser, getUser } = Users;
const { getAllQuestions, getQuestion, createQuestion, getUserQuestion, updateQuestion, deleteQuestion } = Questions;
const { createAnswer, getAnswer, updateAnswer } = Answers;

//  destructure middlewares
const { userSignUp, userLogin } = userValidator;
const { createAnswerValidator } = answerValidator;
const { createQuestionValidator } = questionValidator;
const { authenticate } = verifyToken;
const { idChecker } = paramsChecker;
 
// user endpoints
router
    .get('/auth/users', getAllUsers);
router
    .post('/auth/signup', userSignUp, registerUsers);
router
    .post('/auth/login', userLogin, loginUser);
router
    .get('/auth/:userId', idChecker, getUser);

// Qustion and answer endpoints
router.get('/questions', getAllQuestions);
router.get('/question/:questionId', idChecker, getQuestion);
router.get('/question/:userId/questions', authenticate, idChecker, getUserQuestion);
router.get('/question/:questionId/answers', idChecker, getAnswer);
router.post('/question', createQuestionValidator, authenticate, createQuestion);
router.put('/question/:questionId', idChecker, createQuestionValidator, authenticate, updateQuestion);
router.post('/question/:questionId/answer', idChecker, createAnswerValidator, authenticate, createAnswer);
router.put('/question/:questionId/answers/:answerId', idChecker, createAnswerValidator, authenticate, updateAnswer);
router.delete('/question/:questionId', idChecker, authenticate, deleteQuestion )

export default router;