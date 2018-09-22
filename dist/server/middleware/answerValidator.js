'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var answerValidator = function () {
  function answerValidator() {
    _classCallCheck(this, answerValidator);
  }

  _createClass(answerValidator, null, [{
    key: 'createAnswerValidator',
    value: function createAnswerValidator(req, res, next) {
      if (req.body.body.trim() === '') {
        return res.status(400).json({
          message: 'Please fill in all fields',
          error: true
        });
      } else {
        req.check('body', 'response Body is required').notEmpty();
        var errors = req.validationErrors();
        var validationErrors = [];
        if (errors) {
          errors.map(function (err) {
            return validationErrors.push(err.msg);
          });
          return res.status(400).json({
            errors: validationErrors
          });
        }
        return next();
      }
    }
  }]);

  return answerValidator;
}();

;

exports.default = answerValidator;