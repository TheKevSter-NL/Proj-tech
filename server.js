/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const mongojs = require('mongojs');
const db = mongojs('datingapp', ['users']);
const port = process.env.DB_PORT || 5000;
const mongoosLogin = require('./mongoose');
const multer = require('multer');
// const argon2 = require('argon2');
const uri = "mongodb+srv://kevster:Start123@users-mbdaf.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
//view Engines
app.set('view engine', 'ejs');
app.set('views', 'view');

// body parser middelware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
// Set Static path
app.use(express.static(path.join(__dirname, 'static')));

// Sessions
app.use(session({
  resave: false,
  saveUninitialized: true,
  host: process.env.DB_HOST,
  db_name: process.env.DB_NAME,
  secret: process.env.SESSION_SECRET,
  port: process.env.DB_PORT,
  maxAge: 24 * 60 * 60,
  secure: false

}));
app.listen(process.env.DB_PORT);

// Storage Engine
const storage = multer.diskStorage({
  destination: './static/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + path.extname(file.originalname));
  }
});
// upload

const upload = multer({
  storage: storage
}).single('profile-pic');

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
  db.users.update({}, {
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

  mongoosLogin.findOne({
    studenten_nummer: studenten_nummer,
    password: process.env.PASSWORD
  }, function (err, mongoosLogin) {
    if (err) {
      console.log(err);
      console.log('Error');
      return res.redirect('/inloggen');
    }

    if (!mongoosLogin) {
      console.log('Inloggen mislukt');
      return res.redirect('/inloggen');
    }

    req.session.mongoosLogin = mongoosLogin;
    console.log('Inloggen gelukt');
    return res.status(200).send, res.redirect('/index');
  });
});

//add new user function
app.post('/users/add', function (req, res) {

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
  db.users.insert(newUser);
});
//Delete function
app.get('/users/delete', function (req, res) {
  db.users.remove({});
  console.log('Account is gewist');
  res.redirect("../");
});

//Logout function
app.get('/log-out', function (req, res, next) {
  req.session.destroy(function (err) {
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
  if (!req.session.mongoosLogin) {
    return res.redirect('inloggen'), res.status(401).send();
  }
  res.render('pages/index.ejs', {
    title: "Home",
    mongoosLogin: req.session.mongoosLogin
  });
  console.log(process.env.SESSION_SECRET);
  return res.status(200).send(process.env.SESSION_SECRET);
});

//CHATS PAGE
app.get("/chats", function (req, res) {
  if (!req.session.mongoosLogin) {
    return res.status(401).send(),
      res.redirect('inloggen');
  }
  res.render('pages/chat.ejs', {
    title: "Chat",
    mongoosLogin: req.session.mongoosLogin
  });
  console.log(process.env.SESSION_SECRET);
  return res.status(200).send(process.env.SESSION_SECRET);
});

//Profile PAGE
app.get("/profile", function (req, res) {
  if (!req.session.mongoosLogin) {
    return res.status(401).send(),
      res.redirect('inloggen');
  }
  res.render('pages/profile.ejs', {
    title: "Profile",
    mongoosLogin: req.session.mongoosLogin
  });
  console.log(process.env.SESSION_SECRET);
  return res.status(200).send(process.env.SESSION_SECRET);
});

//Notification PAGE
app.get("/notification", function (req, res) {
  if (!req.session.mongoosLogin) {
    return res.status(401).send(),
      res.redirect('inloggen');
  }
  res.render('pages/notification.ejs', {
    title: "Notification",
    mongoosLogin: req.session.mongoosLogin
  });
  console.log(process.env.SESSION_SECRET);
  return res.status(200).send(process.env.SESSION_SECRET);
});

//Setting PAGE
app.get("/setting", function (req, res) {
  if (!req.session.mongoosLogin) {
    return res.status(401).send(),
      res.redirect('inloggen');
  }
  res.render('pages/setting.ejs', {
    title: "Setting",
    mongoosLogin: req.session.mongoosLogin
  });
  console.log(process.env.SESSION_SECRET);
  return res.status(200).send(process.env.SESSION_SECRET);
});

//Register PAGE
app.get("/register", register);

function register(req, res) {
  db.users.find(function (docs) {
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

app.use(function (req, res, next) {
  res.status(404).render('not-found');
});

app.listen(port, function () {
  console.log(`Server is online ` + port);
});

// app.get('/user-check' ,function(req, res){
//   if(!req.session.mongoosLogin) {
//     return res.status(401).send();
//   }
//   console.log(process.env.SESSION_SECRET);
//   return res.status(200).send(process.env.SESSION_SECRET);
// });
