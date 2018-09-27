'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _userValidator = require('../../middleware/userValidator');

var _userValidator2 = _interopRequireDefault(_userValidator);

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

    it('should be a function', function () {
      expect(userLogin).to.be.a('function');
    });

    it('should accept three arguments', function () {
      expect(userLogin.length).to.equal(3);
    });
  });
});