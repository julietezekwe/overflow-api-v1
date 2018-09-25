'use strict';

var _dbConfig = require('./dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var users = {
    name: "juliet Ezekwe",
    email: "juliet@gmail.com",
    password: "juliet"
};

var hash = _bcrypt2.default.hashSync(users.password, 10);

var query = {
    text: 'INSERT INTO Users(name, email, password) VALUES($1, $2, $3) RETURNING name, email, joined',
    values: [users.name, users.email, hash]
};
_dbConfig2.default.query(query).then(console.log).catch(console.log);