'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var paramsChecker = function () {
  function paramsChecker() {
    _classCallCheck(this, paramsChecker);
  }

  _createClass(paramsChecker, null, [{
    key: 'idChecker',
    value: function idChecker(req, res, next) {
      var _req$params = req.params,
          userId = _req$params.userId,
          questionId = _req$params.questionId,
          answerId = _req$params.answerId;

      var validId = /^[0-9]+$/;
      // check if id is valid

      var checkParam = function checkParam(param) {
        if (!param.match(validId)) {
          return res.status(400).json({
            message: 'ID can only be a number',
            error: true
          });
        }
      };
      if (userId) checkParam(userId);
      if (questionId) checkParam(questionId);
      if (answerId) checkParam(answerId);
      return next();
    }
  }]);

  return paramsChecker;
}();

;

exports.default = paramsChecker;