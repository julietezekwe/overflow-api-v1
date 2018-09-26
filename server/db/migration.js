import pool from './dbConfig';

pool.query('CREATE TABLE IF NOT EXISTS Users(id SERIAL PRIMARY KEY, name VARCHAR(100) not null,  email VARCHAR(100) UNIQUE not null, password VARCHAR(100) not null, joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
pool.query('CREATE TABLE IF NOT EXISTS Questions(id SERIAL PRIMARY KEY, title VARCHAR(100) not null, question TEXT not null, user_id INTEGER not null, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
pool.query('CREATE TABLE IF NOT EXISTS Answers(id SERIAL PRIMARY KEY, answer TEXT not null, question_id INTEGER not null, user_id INTEGER not null, user_name VARCHAR(100) not null, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, accepted INTEGER not null DEFAULT 0)');

