/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
require('dotenv').config();
var express = require('express');
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongo = require('mongodb').MongoClient;
var mongojs = require('mongojs');
var db = mongojs('datingapp', ['users']);
var port = process.env.PORT || 5000;
var mongoosLogin = require('./mongoose');
var multer = require('multer');


//view Engines 
app.set('view engine', 'ejs');
app.set('views', 'view');

// body parser middelware to read HTTP POST 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
// Set Static path for non html code like pictures and CSS
app.use(express.static(path.join(__dirname, 'static')));

// Sessions
app.use(session({
  resave: false, //Forces the session to be saved back to the session store
  saveUninitialized: false, //  reducing server storage usage, or complying with laws that require permission before setting a cookie
  host: process.env.DB_HOST,
  db_name: process.env.DB_NAME,
  secret: process.env.SESSION_SECRET,
  port: process.env.DB_PORT,
  maxAge: 24 * 60 * 60, //time for session to expire the user is then logt-out
  secure: false

}));
app.listen(process.env.DB_PORT);

// Storage Engine
var storage = multer.diskStorage({ //storage function to store a file 
  destination: './static/uploads/', //select a desination to store the file
  filename: function (req, file, cb) { // change the file name to name of the fieldname
    cb(null, file.fieldname + path.extname(file.originalname));
  }
});
// upload

var upload = multer({
  storage: storage
}).single('profile-pic'); // upload 1 file with the name profile-pic

app.post('/users/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.redirect('pages/uploadprofile.ejs', {
        msg: err
      });
    } else {
      console.log(req.file);
      res.redirect('/userprofile');

    }
  });
});

//Edit function
app.post('/users/edit', function (req, res) {
  db.users.update({}, { //update the users db record
    studenten_nummer: req.body.studenten_nummer,
    password: req.body.password,
    first_name: req.body.first_name,
    opleiding: req.body.opleiding,
    leeftijd: req.body.leeftijd,
    overJezelf: req.body.overJezelf
  });
  console.log('Profile is aangepast');
  res.redirect("../uploadprofile");
});
//Sign in function
app.post('/users/signin', function (req, res) {

  studenten_nummer = req.body.studenten_nummer;
  process.env.PASSWORD = req.body.password;
//find one record that matches input from the login form
  mongoosLogin.findOne({
    studenten_nummer: studenten_nummer,
    password: process.env.PASSWORD
  }, function (err, mongoosLogin) {
    if (err) { //if something whent wrong redirect to login screen
      console.log(err);
      console.log('Error');
      return res.redirect('/inloggen');
    }
    //if record not found redirect to login screen
    if (!mongoosLogin) {
      console.log('Inloggen mislukt');
      return res.redirect('/inloggen');
    }
//if record found login with session
    req.session.mongoosLogin = mongoosLogin;
    console.log('Inloggen gelukt');
    return res.status(200).send, res.redirect('/index');
  });
});

//add new user function
app.post('/users/add', function (req, res) {
//add all of the input form the form 
  var newUser = {
    studenten_nummer: req.body.studenten_nummer,
    password: req.body.password,
    first_name: req.body.first_name,
    opleiding: req.body.opleiding,
    leeftijd: req.body.leeftijd,
    overJezelf: req.body.overJezelf
  };
  console.log('Registeren is gelukt');
  res.redirect("../uploadprofile");
  db.users.insert(newUser);//insert into the db
});
//Delete function
app.get('/users/delete', function (req, res) {
  db.users.remove({});//delete the record form the db
  console.log('Account is gewist');
  res.redirect("../");
});

//Logout function
app.get('/log-out', function (req, res, next) {
  req.session.destroy(function (err) {//signout and destroy the session
    if (err) {
      next(err);
    } else {
      res.redirect('/inloggen');
      console.log('Je bent nu uitgelogd');
    }
  });
});

//--------PAGES--------------

//START
app.get("/", function (req, res) {
  res.render('pages/start.ejs', {
    title: "start"
  });
});

//INDEX (DASHBOARD)  PAGE
app.get("/index", function (req, res) {
  if (!req.session.mongoosLogin) { //if no session active then redirect to login
    return res.redirect('inloggen'), res.status(401).send();
  }//if logt in then render the page and session stay
  res.render('pages/index.ejs', {
    title: "Home",
    mongoosLogin: req.session.mongoosLogin
  });
  console.log(process.env.SESSION_SECRET);
  return res.status(200).send(process.env.SESSION_SECRET);
});

//CHATS PAGE
app.get("/chats", function (req, res) {
  if (!req.session.mongoosLogin) {//if no session active then redirect to login
    return res.status(401).send(),
      res.redirect('inloggen');
  }//if logt in then render the page and session stay
  res.render('pages/chats.ejs', {
    title: "Chat",
    mongoosLogin: req.session.mongoosLogin
  });
  console.log(process.env.SESSION_SECRET);
  return res.status(200).send(process.env.SESSION_SECRET);
});

//Profile PAGE
app.get("/profile", function (req, res) {//if no session active then redirect to login
  if (!req.session.mongoosLogin) {
    return res.status(401).send(),
      res.redirect('inloggen');
  }//if logt in then render the page and session stay
  res.render('pages/profile.ejs', {
    title: "Profile",
    mongoosLogin: req.session.mongoosLogin
  });
  console.log(process.env.SESSION_SECRET);
  return res.status(200).send(process.env.SESSION_SECRET);
});

//Notification PAGE
app.get("/notification", function (req, res) { //if no session active then redirect to login
  if (!req.session.mongoosLogin) {
    return res.status(401).send(),
      res.redirect('inloggen'); 
  }//if logt in then render the page and session stay
  res.render('pages/notification.ejs', {
    title: "Notification",
    mongoosLogin: req.session.mongoosLogin
  });
  console.log(process.env.SESSION_SECRET);
  return res.status(200).send(process.env.SESSION_SECRET);
});

//Setting PAGE
app.get("/setting", function (req, res) {//if no session active then redirect to login
  if (!req.session.mongoosLogin) {
    return res.status(401).send(),
      res.redirect('inloggen');
  }//if logt in then render the page and session stay
  res.render('pages/setting.ejs', {
    title: "Setting",
    mongoosLogin: req.session.mongoosLogin
  });
  console.log(process.env.SESSION_SECRET);
  return res.status(200).send(process.env.SESSION_SECRET);
});


//i tryed to make the pages below with sessions but didn't work
//Register PAGE
app.get("/register", register);
//find the records and use them 
function register(req, res) {
  db.users.find(function (docs) { em 
    res.render('pages/register.ejs', {
      title: "register",
      users: docs
    });
  });
}

//Upload profile PAGE
app.get("/uploadprofile", uploadprofile);
function uploadprofile(req, res) {
  res.render('pages/uploadprofile.ejs', {
    title: "profile-uploaden",
    users: req.session.user,
    mongoosLogin: req.session.mongoosLogin
  });
}

//Inlog PAGE
app.get("/inloggen", inloggen);
//find the records and use them 
function inloggen(req, res) {
  db.users.find(function (docs) {
    res.render('pages/inloggen.ejs', {
      title: "inloggen",
      user: req.session.user,
      users: docs,
      mongoosLogin: req.session.mongoosLogin
    });
  });
}

//Edit PAGE
app.get("/edit", edit);
//find the records and use them 
function edit(req, res) {
  db.users.find(function (docs) {
    res.render('pages/edit.ejs', {
      title: "Edit",
      users: docs,
      mongoosLogin: req.session.mongoosLogin
    });
  });
}
//Userprofile PAGE
app.get("/userprofile", userprofile);
//find the records and use them 
function userprofile(req, res) {
  db.users.find(function (err, docs) {
    console.log(docs);
    res.render('pages/userprofile.ejs', {
      title: "userprofile",
      users: docs,
      mongoosLogin: req.session.mongoosLogin
    });
  });
}

//-------------------------
//render the not-found page if status 404
app.use(function (req, res, next) {
  res.status(404).render('not-found');
});
//console log if the server is live
app.listen(port, function () {
  console.log(`Server is online ` + port);
});

// check if the secret displays on the page

// app.get('/user-check' ,function(req, res){
//   if(!req.session.mongoosLogin) {
//     return res.status(401).send();
//   }
//   console.log(process.env.SESSION_SECRET);
//   return res.status(200).send(process.env.SESSION_SECRET);
// });


//source
// https://www.youtube.com/watch?v=MxfxiR8TVNU&list=LLeXuVYvIVqf9E8bVb_mM7YA&index=2&t=0s for heroku
// https://www.youtube.com/watch?v=9Qzmri1WaaE&t=1748s for multer and storage function 
// https://www.youtube.com/watch?v=gnsO8-xJ8rs express course i only used the register part
// https://www.youtube.com/watch?v=zsOGmMuwhT4 for the secret key
// https://www.youtube.com/watch?v=pzGQMwGmCnc for the login page