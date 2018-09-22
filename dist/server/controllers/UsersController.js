'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _UserModel = require('../dummyModel/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var secret = "u1lJdh";
var lastIndexOf = function lastIndexOf(array) {
    return array[array.length - 1];
};

var Users = function () {
    function Users() {
        _classCallCheck(this, Users);
    }

    _createClass(Users, null, [{
        key: 'getAllUsers',
        value: function getAllUsers(req, res) {
            return res.status(201).json({
                userModel: _UserModel2.default,
                message: 'success'

            });
        }
    }, {
        key: 'getUser',
        value: function getUser(req, res) {
            var userId = req.params.userId;

            var found = false;
            var userDetail = void 0;
            _UserModel2.default.map(function (user) {
                // found a user
                if (user.id === Number(userId)) {
                    found = true;
                    userDetail = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        joined: user.joined
                    };
                    return res.status(201).json({
                        userDetail: userDetail,
                        message: 'success'

                    });
                }
            });
            // wrong id
            if (!found) {
                return res.status(404).json({
                    message: 'No user found',
                    error: true

                });
            }
        }
    }, {
        key: 'registerUsers',
        value: function registerUsers(req, res) {
            var _req$body = req.body,
                name = _req$body.name,
                email = _req$body.email,
                password = _req$body.password;

            var found = false;
            _UserModel2.default.map(function (user) {
                //    check if email is taken
                if (user.email === email) {
                    found = true;
                    return res.status(400).json({
                        message: "email already exist",
                        error: true
                    });
                }
            });

            if (!found) {
                // push to the model
                _UserModel2.default.push({
                    id: _UserModel2.default.length + 1,
                    name: name,
                    email: email,
                    password: _bcrypt2.default.hashSync(password, 10),
                    joined: new Date()
                });

                var userDetail = lastIndexOf(_UserModel2.default);
                // Assign token to user for 30sec
                var token = _jsonwebtoken2.default.sign(userDetail, secret, { expiresIn: '30s' });
                // Success message

                return res.status(201).json({
                    userDetail: userDetail,
                    message: 'Signed up successfully',
                    token: token
                });
            }
        }
    }, {
        key: 'loginUser',
        value: function loginUser(req, res) {
            var _req$body2 = req.body,
                name = _req$body2.name,
                email = _req$body2.email,
                password = _req$body2.password;

            var found = false;
            var userDetail = void 0;
            _UserModel2.default.map(function (user) {
                if (user.email === email) {
                    found = true;
                    userDetail = user;
                }
            });

            //user found
            if (found) {
                if (_bcrypt2.default.compareSync(password, userDetail.password)) {
                    // Assign token to user for 30sec
                    var token = _jsonwebtoken2.default.sign(userDetail, secret, { expiresIn: '1hr' });
                    // Success message

                    return res.status(201).json({
                        userDetail: userDetail,
                        message: 'logged in successfully',
                        token: token
                    });
                } else {
                    //  invalid password
                    return res.status(400).json({
                        message: 'wrong credentials',
                        error: true
                    });
                }
            } else {
                //    user does not exist
                return res.status(400).json({
                    message: 'User does not exist',
                    error: true
                });
            }
        }
    }]);

    return Users;
}();

exports.default = Users;