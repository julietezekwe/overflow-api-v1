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
describe('User', function () {
  it('not register a user if email is not unique', function (done) {

    var userDetails = {

      name: 'Juliet chidimma',
      password: 'juliet',
      email: 'juliet@gmail.com'

    };
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(userDetails).end(function (err, res) {
      expect(res.body.message).to.eql('email already exist');
      expect(res.status).to.equal(400);
      done();
    });
  });
  it('should register a user successfully', function (done) {

    var userDetails = {
      name: 'Oge Ibezim',
      password: 'Ibezim',
      email: 'oge@gmail.com'

    };
    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(userDetails).end(function (err, res) {
      expect(res.body.message).to.eql('Signed up successfully');
      expect(res.body).to.have.property('token');
      expect(res.body).to.have.property('userDetail');
      expect(res.status).to.equal(201);
      authToken = res.body.token;
      done();
    });
  });

  it('it should not login a user with wrong credential', function (done) {

    var userDetails = {
      email: 'juliet@gmail.com',
      password: 'jul'
    };
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(userDetails).end(function (err, res) {
      expect(res.body).to.be.a('object');
      expect(res.body.message).to.eql('wrong credentials');
      expect(res.status).to.equal(400);
      done();
    });
  });

  it('it should login a valid user', function (done) {

    var userDetails = {
      email: 'juliet@gmail.com',
      password: 'juliet'
    };
    _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(userDetails).end(function (err, res) {
      expect(res.body).to.be.a('object');
      expect(res.body.message).eql('logged in successfully');
      expect(res.body).to.have.property('token');
      expect(res.body).to.have.property('userDetail');
      expect(res.status).to.equal(201);
      authToken = res.body.token;
      done();
    });
  });

  it('should not get a user that does not exist', function (done) {

    _chai2.default.request(_app2.default).get('/api/v1/auth/10').end(function (err, res) {
      expect(res.body.message).to.eql('No user found');
      expect(res.status).to.equal(404);
      done();
    });
  });

  it('should get a user that exist', function (done) {

    _chai2.default.request(_app2.default).get('/api/v1/auth/2').end(function (err, res) {
      expect(res.body.message).to.eql('success');
      expect(res.status).to.equal(201);
      done();
    });
  });
});