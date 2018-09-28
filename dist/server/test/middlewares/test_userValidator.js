'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _userValidator = require('../../middleware/userValidator');

var _userValidator2 = _interopRequireDefault(_userValidator);

var _app = require('../../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
var expect = _chai2.default.expect;
var userSignUp = _userValidator2.default.userSignUp,
    userLogin = _userValidator2.default.userLogin;


describe('USER VALIDATOR TESTS', function () {
  describe('signup tests', function () {
    it('should be a function', function () {
      expect(userSignUp).to.be.a('function');
    });

    it('should accept three arguments', function () {
      expect(userSignUp.length).to.equal(3);
    });
    it('should not accept empty fields', function (done) {

      var userDetails = {

        name: '    ',
        password: '',
        email: 'julietunique@gmail.com'

      };
      _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(userDetails).end(function (err, res) {
        expect(res.body.message).to.eql('Please fill in all fields');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should not accept empty fields', function (done) {

      var userDetails = {

        password: '',
        email: 'julietunique@gmail.com'

      };
      _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(userDetails).end(function (err, res) {
        expect(res.body.message).to.eql('Please fill in all fields');
        expect(res.body.error).to.eql(true);
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should not accept invalid email', function (done) {

      var userDetails = {
        email: 'julietun',
        password: 'juliet'

      };
      _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(userDetails).end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should not accept invalid email', function (done) {

      var userDetails = {
        name: 'name',
        email: 'julietun',
        password: 'ju'

      };
      _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(userDetails).end(function (err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should be a function', function () {
      expect(userLogin).to.be.a('function');
    });

    it('should accept three arguments', function () {
      expect(userLogin.length).to.equal(3);
    });
  });
});