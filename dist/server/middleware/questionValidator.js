'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var questionValidator = function () {
  function questionValidator() {
    _classCallCheck(this, questionValidator);
  }

  _createClass(questionValidator, null, [{
    key: 'createQuestionValidator',
    value: function createQuestionValidator(req, res, next) {
      if (req.body.title.trim() === '' || req.body.body.trim() === '') {
        return res.status(400).json({
          message: 'Please fill in all fields',
          error: true
        });
      } else {
        req.check('title', 'Question Title is required').notEmpty();
        req.check('body', 'Question Body is required').notEmpty();

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

  return questionValidator;
}();

;

exports.default = questionValidator;