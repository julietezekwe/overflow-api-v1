'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _answerValidator = require('../../middleware/answerValidator');

var _answerValidator2 = _interopRequireDefault(_answerValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
var expect = _chai2.default.expect;
var createAnswerValidator = _answerValidator2.default.createAnswerValidator;


describe('USER VALIDATOR TESTS', function () {
  describe('signup tests', function () {
    it('should be a function', function () {
      expect(createAnswerValidator).to.be.a('function');
    });

    it('should accept three arguments', function () {
      expect(createAnswerValidator.length).to.equal(3);
    });
  });
});