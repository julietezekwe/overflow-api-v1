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

describe('Answers', function () {
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

    it('it should not post a answer with empty feilds', function (done) {

      var answer = {
        body: ' '

      };
      _chai2.default.request(_app2.default).post('/api/v1/question/1/answer').send(answer).end(function (err, res) {
        expect(res.body.message).to.eql('Please fill in all fields');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('it should not post answer for user without token', function (done) {

      var answer = {

        body: "body"
      };
      _chai2.default.request(_app2.default).post('/api/v1/question/1/answer').send(answer).end(function (err, res) {
        expect(res.body.message).to.eql('Kindly sign in');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(403);
        done();
      });
    });

    it('it should not post answer for user with wrong token', function (done) {
      var wrongToken = authToken + 'somewrong text';
      var answer = {
        body: "body"
      };
      _chai2.default.request(_app2.default).post('/api/v1/question/1/answer').set('Authorization', wrongToken).send(answer).end(function (err, res) {
        expect(res.body.message).to.eql('Kindly sign in, wrong authentication');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(403);
        done();
      });
    });

    it('should post answer for user with valid token and question exist', function (done) {

      var question = {
        title: "title",
        body: "body"
      };
      _chai2.default.request(_app2.default).post('/api/v1/question/1/answer').set('Authorization', authToken).send(question).end(function (err, res) {
        expect(res.body.message).to.eql('succefully created answer');
        expect(res.body.error).to.eql(false);
        expect(res.status).to.equal(201);
        done();
      });
    });

    it('should post not answer for a question that does not exist', function (done) {

      var question = {
        title: "title",
        body: "body"
      };
      _chai2.default.request(_app2.default).post('/api/v1/question/9/answer').set('Authorization', authToken).send(question).end(function (err, res) {
        expect(res.body.message).to.eql('this question does not exist');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  /*
    Test the /GET requests
  */
  describe('/GET REQUESTS', function () {
    var wrongToken = authToken + 'somewrong text';

    it('it should not get answer without a valid id ', function (done) {

      _chai2.default.request(_app2.default).get('/api/v1/question/0bcc/answers').end(function (err, res) {
        expect(res.body.message).to.eql('ID can only be a number');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('it should not get answers that does not exist ', function (done) {

      _chai2.default.request(_app2.default).get('/api/v1/question/9/answers').end(function (err, res) {
        expect(res.body.message).to.eql('no answers found');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('it should question\' answers ', function (done) {

      _chai2.default.request(_app2.default).get('/api/v1/question/1/answers').end(function (err, res) {
        expect(res.body.message).to.eql('Success');
        expect(res.status).to.equal(201);
        done();
      });
    });
  });
});