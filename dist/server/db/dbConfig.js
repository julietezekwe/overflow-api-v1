'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pg = require('pg');

var connectionString = 'postgresql://chidimma:password@localhost:5432/stack';
var pool = new _pg.Pool({
    connectionString: connectionString
});
// const pool = new Pool(connectionString);

exports.default = pool;