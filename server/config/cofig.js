require('dotenv').config();

module.exports = {
  development: {
 
    connectionString: process.env.DATABASE_URL
  },
  test: {
    connectionString: process.env.DATABASE_URL
  },
  production: {
    connectionString,
    ssl: true
  }
};
