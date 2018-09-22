// Dependencies
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');

// Init App
const app = express();
const PORT = process.env.PORT || 5000;

//Body Parser Middleware 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// User morgan to log all requests
app.use(logger('dev'));

// Init static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// Init DB
const db = process.env.MONGODB_URI || "mongodb://localhost/spacextest";

// Connect to DB
mongoose.connect(db, { useNewUrlParser: true }, () => {
    console.log('Connected to mongoDB...');
}).catch(err => console.log(err));


// Import routes from controller folder so server has access to them
const routes = require('./routes/api/routes.js');
app.use(routes);

// Init server and begin listening
app.listen(PORT, () => {
    console.log(`Server now listening on port: ${PORT}...`);
});