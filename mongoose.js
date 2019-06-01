/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/datingapp', {useNewUrlParser: true});
var userSchema = new mongoose.Schema({
    studenten_nummer: {type: String, unique: true},
    password: {type: String}

});

var mongoosLogin = mongoose.model('users', userSchema);
module.exports = mongoosLogin;