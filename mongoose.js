/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');

// mongoose.connect('mongodb+srv://kevster:Start123@dattingapp-fr6ws.mongodb.net/test?retryWrites=true&w=majority'), {useNewUrlParser: true};
mongoose.connect('mongodb://localhost/datingapp', {useNewUrlParser: true});
var userSchema = new mongoose.Schema({
    studenten_nummer: {type: String, unique: true},
    password: {type: String}

});


var mongoosLogin = mongoose.model('users', userSchema);
module.exports = mongoosLogin;