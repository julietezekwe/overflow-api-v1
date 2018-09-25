"use strict";

var _dbConfig = require("../db/dbConfig");

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var query = {
  text: 'SELECT name, email, joined FROM users'

};
_dbConfig2.default.query(query).then(function (users) {
  var Users = users.rows;
  console.log(Users);
});

//  export default Users;