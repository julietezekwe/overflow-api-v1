'use strict';

var _dbConfig = require('./dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dbConfig2.default.query('DROP TABLE IF EXISTS Answers');
_dbConfig2.default.query('DROP TABLE IF EXISTS Questions');
_dbConfig2.default.query('DROP TABLE IF EXISTS Users');