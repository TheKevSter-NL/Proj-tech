/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    studenten_nummer: {type: String, unique: true},
    password: {type: String}

});

var user = mongoose.model('users', userSchema);
module.exports = user;