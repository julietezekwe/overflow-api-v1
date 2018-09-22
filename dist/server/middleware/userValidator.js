'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var userValidator = function () {
  function userValidator() {
    _classCallCheck(this, userValidator);
  }

  _createClass(userValidator, null, [{
    key: 'userSignUp',
    value: function userSignUp(req, res, next) {
      if (req.body.name.trim() === '' || req.body.email.trim() === '' || req.body.password.trim() === '') {
        return res.status(400).json({
          message: 'Please fill in all fields',
          error: true
        });
      } else {
        req.check('name', 'Name is required').notEmpty();
        req.check('email', 'Email is required').notEmpty();
        req.check('email', 'Email is not valid').isEmail();
        req.check('password', 'Password is required').notEmpty();
        req.check('password', 'Minimum password length is 5 characters').isLength({ min: 5 });

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
      }
      return next();
    }
  }, {
    key: 'userLogin',
    value: function userLogin(req, res, next) {
      if (req.body.email.trim() === '' || req.body.password.trim() === '') {
        return res.status(400).json({
          message: 'Please fill in all fields',
          error: true
        });
      } else {
        req.check('email', 'email is required').notEmpty();
        req.check('password', 'Password is required').notEmpty();
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
      }
      return next();
    }
  }]);

  return userValidator;
}();

;

exports.default = userValidator;