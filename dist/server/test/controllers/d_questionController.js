'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
var expect = _chai2.default.expect;


var authToken = void 0;

describe('Questions', function () {
  /*
  * Test the /POST requests
  */
  describe('/POST REQUESTS', function () {
    before(function (done) {
      var userDetails = {
        email: 'juliet@gmail.com',
        password: 'juliet'
      };
      _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(userDetails).end(function (err, res) {
        authToken = res.body.token;
        done();
      });
    });

    it('it should not post a question with empty feilds', function (done) {

      var question = {
        title: '   ',
        body: 'The body exists'

      };
      _chai2.default.request(_app2.default).post('/api/v1/question').send(question).end(function (err, res) {
        expect(res.body.message).to.eql('Please fill in all fields');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('it should not post question for user without token', function (done) {

      var question = {
        title: "title",
        body: "body"
      };
      _chai2.default.request(_app2.default).post('/api/v1/question').send(question).end(function (err, res) {
        expect(res.body.message).to.eql('Kindly sign in');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(403);
        done();
      });
    });

    it('it should not post question for user with wrong token', function (done) {
      var wrongToken = authToken + 'somewrong text';
      var question = {
        title: "title",
        body: "body"
      };
      _chai2.default.request(_app2.default).post('/api/v1/question').set('Authorization', wrongToken).send(question).end(function (err, res) {
        expect(res.body.message).to.eql('Kindly sign in, wrong authentication');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(403);
        done();
      });
    });

    it('should post question for user with valid token', function (done) {

      var question = {
        title: "title",
        body: "body"
      };
      _chai2.default.request(_app2.default).post('/api/v1/question').set('Authorization', authToken).send(question).end(function (err, res) {
        expect(res.body.message).to.eql('succefully created a question');
        expect(res.body.error).to.eql(false);
        expect(res.status).to.equal(201);
        done();
      });
    });
  });

  /*
    * Test the /GET requests
  */
  describe('/GET REQUESTS', function () {
    var wrongToken = authToken + 'somewrong text';
    it('it should not get a user Question if user is not signed in', function (done) {

      _chai2.default.request(_app2.default).get('/api/v1/question/1/questions').set('Authorization', wrongToken).end(function (err, res) {
        expect(res.body.message).to.eql('Kindly sign in, wrong authentication');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(403);
        done();
      });
    });

    it('it should not get user\'s question for user without token', function (done) {

      _chai2.default.request(_app2.default).get('/api/v1/question/1/questions').end(function (err, res) {
        expect(res.body.message).to.eql('Kindly sign in');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(403);
        done();
      });
    });
    it('it should not get questions without a valid id ', function (done) {

      _chai2.default.request(_app2.default).get('/api/v1/question/0bcc/questions').set('Authorization', authToken).end(function (err, res) {
        expect(res.body.message).to.eql('ID can only be a number');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('it should not get questions without a valid id ', function (done) {

      _chai2.default.request(_app2.default).get('/api/v1/question/0bcc').end(function (err, res) {
        expect(res.body.message).to.eql('ID can only be a number');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('it should not get questions that does not exist ', function (done) {

      _chai2.default.request(_app2.default).get('/api/v1/question/50').end(function (err, res) {
        expect(res.body.message).to.eql('no questions found');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('it should get valid questions ', function (done) {

      _chai2.default.request(_app2.default).get('/api/v1/question/1').end(function (err, res) {
        expect(res.body.message).to.eql('Success');
        expect(res.status).to.equal(201);
        done();
      });
    });
    it('it should not get questions when the user does not have questions ', function (done) {

      _chai2.default.request(_app2.default).get('/api/v1/question/3/questions').set('Authorization', authToken).end(function (err, res) {
        expect(res.body.message).to.eql('no questions found');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('should get question for user with valid token', function (done) {

      _chai2.default.request(_app2.default).get('/api/v1/question/1/questions').set('Authorization', authToken).end(function (err, res) {
        expect(res.body.message).to.eql('Success');
        expect(res.body).to.have.property('questions');
        expect(res.body).to.have.property('user');
        expect(res.status).to.equal(201);
        done();
      });
    });

    it('should get all questions', function (done) {

      _chai2.default.request(_app2.default).get('/api/v1/questions').end(function (err, res) {
        expect(res.body.message).to.eql('success');
        expect(res.body).to.have.property('questionModel');
        expect(res.status).to.equal(201);
        done();
      });
    });
  });

  // delete question
  describe('/DELETE REQUESTS', function () {

    it('it should not delete question for user without token', function (done) {

      _chai2.default.request(_app2.default).delete('/api/v1/question/1').end(function (err, res) {
        expect(res.body.message).to.eql('Kindly sign in');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(403);
        done();
      });
    });

    it('it should not post question for user with wrong token', function (done) {
      var wrongToken = authToken + 'somewrong text';

      _chai2.default.request(_app2.default).delete('/api/v1/question/3').set('Authorization', wrongToken).end(function (err, res) {
        expect(res.body.message).to.eql('Kindly sign in, wrong authentication');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(403);
        done();
      });
    });

    it('User can only delete its owned question', function (done) {

      _chai2.default.request(_app2.default).delete('/api/v1/question/2').set('Authorization', authToken).end(function (err, res) {
        expect(res.body.message).to.eql('You have no question with this ID.');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(401);
        done();
      });
    });

    it('should delete question for user with valid token', function (done) {

      _chai2.default.request(_app2.default).delete('/api/v1/question/1').set('Authorization', authToken).end(function (err, res) {
        expect(res.body.message).to.eql('Deleted successfully');
        expect(res.status).to.equal(201);
        done();
      });
    });
  });
});