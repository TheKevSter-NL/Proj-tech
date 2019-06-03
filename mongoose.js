/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();

var mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL || 'postgres://dfrucmmpjlpaew:1e82d0ab56f1e51eff86da62e81d4f208e97868f93bef42a74af06baf6e15add@ec2-54-75-245-196.eu-west-1.compute.amazonaws.com:5432/d44jfmo3nklk3', {useNewUrlParser: true}, {useMongoClient: true});
// mongoose.connect('mongodb://localhost/datingapp', {useNewUrlParser: true});
var userSchema = new mongoose.Schema({
    studenten_nummer: {type: String, unique: true},
    password: {type: String}

});

var mongoosLogin = mongoose.model('users', userSchema);
module.exports = mongoosLogin;