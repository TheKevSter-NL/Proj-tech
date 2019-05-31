/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();

// app.use(session({
//     resave: false,
//     saveUninitialized: true,
//     host: process.env.DB_HOST,
//     db_name: process.env.DB_NAME,
//   }));
//   app.listen(process.env.PORT);
//   process.env['DB_HOST'] = 'host';
//   process.env['MONGO_DB'] = 'database';


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/datingapp', {useNewUrlParser: true});
var userSchema = new mongoose.Schema({
    studenten_nummer: {type: String, unique: true},
    password: {type: String}

});

var mongoosLogin = mongoose.model('users', userSchema);
module.exports = mongoosLogin;