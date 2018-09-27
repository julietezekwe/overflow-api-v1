'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var ssl = false;
if (process.env.NODE_ENV == 'production') {
    ssl = true;
}
var connectionString = process.env.DATABASE_URL;
var pool = new _pg.Pool({
    connectionString: connectionString,
    ssl: ssl
});

exports.default = pool;