# overflow-api-v1

[![Build Status](https://travis-ci.org/julietezekwe/overflow-api-v1.svg)](https://travis-ci.org/julietezekwe/overflow-api-v1)

[![Coverage Status](https://coveralls.io/repos/github/julietezekwe/overflow-api-v1/badge.svg?branch=master)](https://coveralls.io/github/julietezekwe/overflow-api-v1?branch=master)

[![Maintainability](https://api.codeclimate.com/v1/badges/aa223eeaa25169feb02c/maintainability)](https://codeclimate.com/github/julietezekwe/overflow-api-v1/maintainability)

Stackoverflow Lite is a webapp where develpers and people in tech ask and find solutions to tech related problems

## Table of Contents
1. <a href="#hosted-app">Link to Hosted App</a>
2. <a href="#pivotal-tracker">Link to Pivotal Tracker</a>
3. <a href="#tech-stack-used">Tech Stack Used</a>
4. <a href="#application-features">Application Features</a>
5. <a href="#how-to-use">How To Use</a>
6. <a href="#author">Author</a>
7. <a href="#license">License</a>


## Link to Hosted App



## Link to Pivotal Tracker

https://www.pivotaltracker.com/n/projects/2192121

## Tech Stack Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Body-parser](https://www.npmjs.com/package/body-parser)
- [Express-Validator](https://www.npmjs.com/package/express-validator)

##API Documentation

- [API Documentation](https://stackoverflow-lite-server.herokuapp.com/api-docs)

## Application Features

* Post A Question
* Delete a Question
* Get all the Answers to A Question
* Post an Answer
* Get All Questions
* Get a Question Detail


## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/julietezekwe/overflow-api-v1

# Go into the repository
$ cd overflow-api-v1

# Install dependencies
$ npm install

# Create .env file for environmental variables in your root directory like the .env.example file


# Run the app
$ npm start
```

## API endpoints
```
POST Request -> localhost:8000/api/v1/auth/signup
POST Request -> localhost:8000/api/v1/auth/login
GET Request -> localhost:8000/api/v1/auth/:userId
GET Request -> localhost:8000/api/v1/auth/users
POST Request -> localhost:8000/api/v1/question
GET Request ->  localhost:8000/api/v1/questions
GET Request ->  localhost:8000/api/v1/question/:questionsId    
DELETE Request -> localhost:8000/api/v1/questions/:questionsId
GET Request ->  localhost:8000/api/v1/question/:userId/questions
POST Request -> localhost:8000/api/v1/question/:questionId/answer
GET Request -> localhost:8000/api/v1/question/:questionId/answers
```

## Tests

* To run tests, navigate to the project's root directory
* After installation, run `npm run test`

## Author

Chidimma Juliet Ezekwe


## License

ISC

---
