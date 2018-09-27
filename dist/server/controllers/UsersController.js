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

var _dbConfig = require('../db/dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();

var secret = process.env.SECRETE_KEY;
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
            var query = {
                text: 'SELECT name, email, joined FROM users'
            };
            _dbConfig2.default.query(query).then(function (users) {
                if (users.rowCount > 0) {
                    return res.status(201).json({
                        users: users.rows,
                        message: 'success'

                    });
                }
            });
        }
    }, {
        key: 'getUser',
        value: function getUser(req, res) {
            var userId = req.params.userId;


            var userDetail = void 0;

            var query = {
                text: 'SELECT name, email, joined FROM users Where id = $1',
                values: [userId]
            };

            _dbConfig2.default.query(query).then(function (user) {
                if (user.rowCount === 1) {
                    userDetail = user.rows[0];
                    return res.status(201).json({
                        userDetail: userDetail,
                        message: 'success'

                    });
                } else {
                    return res.status(404).json({
                        message: 'No user found',
                        error: true

                    });
                }
            });
        }
    }, {
        key: 'registerUsers',
        value: function registerUsers(req, res) {
            var _req$body = req.body,
                name = _req$body.name,
                email = _req$body.email,
                password = _req$body.password;

            var hash = _bcrypt2.default.hashSync(password, 10);
            _dbConfig2.default.query({ text: "SELECT email from Users where email = $1", values: [email] }).then(function (emailfound) {
                if (emailfound.rowCount === 0) {
                    var query = {
                        text: 'INSERT INTO Users(name, email, password) VALUES($1, $2, $3) RETURNING id, name, email, joined',
                        values: [name, email, hash]
                    };
                    _dbConfig2.default.query(query).then(function (user) {
                        var userDetail = user.rows[0];
                        var id = userDetail.id,
                            name = userDetail.name,
                            joined = userDetail.joined;

                        var authDetail = { id: id, email: email, name: name, joined: joined };

                        var token = _jsonwebtoken2.default.sign(authDetail, secret, { expiresIn: '1hr' });
                        return res.status(201).json({ authDetail: authDetail, message: 'Signed up successfully', token: token });
                    });
                } else {
                    return res.status(400).json({ message: "email already exist", error: true });
                }
            });
        }
    }, {
        key: 'loginUser',
        value: function loginUser(req, res) {
            var _req$body2 = req.body,
                email = _req$body2.email,
                password = _req$body2.password;

            var userDetail = void 0;
            var query = { text: 'SELECT * FROM users Where email = $1', values: [email] };
            _dbConfig2.default.query(query).then(function (user) {
                if (user.rowCount) {
                    userDetail = user.rows[0];
                    if (_bcrypt2.default.compareSync(password, userDetail.password)) {
                        // Assign token to user for 30sec
                        var _userDetail = userDetail,
                            id = _userDetail.id,
                            name = _userDetail.name,
                            joined = _userDetail.joined;

                        var authDetail = { id: id, email: email, name: name, joined: joined };
                        var token = _jsonwebtoken2.default.sign(authDetail, secret, { expiresIn: '1hr' });
                        // Success message
                        return res.status(201).json({ message: 'logged in successfully', token: token });
                    } else {
                        return res.status(400).json({
                            message: 'wrong credentials',
                            error: true
                        });
                    }
                } else {
                    return res.status(400).json({ message: 'User does not exist', error: true });
                }
            });
        }
    }]);

    return Users;
}();

exports.default = Users;