const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Access environment variables
 const DB_NAME = process.env.DB_NAME;
 const DB_USERNAME = process.env.DB_USERNAME;
 const DB_PASSWORD = process.env.DB_PASSWORD;
 const SECRETKEY = process.env.SECRET_KEY;

// Export the variables if needed
module.exports = { DB_NAME, DB_USERNAME, DB_PASSWORD, SECRETKEY  };