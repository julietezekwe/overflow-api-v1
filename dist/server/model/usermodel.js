'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dbConfig = require('../db/dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Users = {
    registerAUser: {},
    getAllUsersModel: function getAllUsersModel() {
        var query = {
            text: 'SELECT name, email, joined FROM users'
        };
        _dbConfig2.default.query(query).then(function (users) {
            var Users = users.rows;
            console.log(Users);
        });
    },
    getAUserModel: function getAUserModel(userId) {

        var query = {
            text: 'SELECT name, email, joined FROM users Where id = $1',
            values: [userId]
        };

        return _dbConfig2.default.query(query);
    }
};

exports.default = Users;