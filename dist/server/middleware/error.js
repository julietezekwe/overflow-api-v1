"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ErrorHandler = function ErrorHandler(errors, code) {

  if (errors) {
    var validationErrors = [];
    errors.map(function (err) {
      return validationErrors.push(err.msg);
    });
    return res.status(400).json({
      errors: validationErrors
    });
  }
};

exports.default = ErrorHandler;