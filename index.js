'use strict';

require('dotenv').config();

// Start up DB Server
const mongoose = require('mongoose');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
};

const PORT = process.env.PORT || 3000;
const DBNAME = 'stuff';
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${DBNAME}`;
mongoose.connect(MONGODB_URI, options);

// Start the web server
require('./src/app.js').start(PORT);
