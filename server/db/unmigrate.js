import pool from "./dbConfig";

pool.query('DROP TABLE IF EXISTS Answers');
pool.query('DROP TABLE IF EXISTS Questions');
pool.query('DROP TABLE IF EXISTS Users');