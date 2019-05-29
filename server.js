/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const dontev = require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const mongo = require('mongodb');
const mongojs = require('mongojs');
const db = mongojs('datingapp', ['users']);
const port = 3000;
const app = express();
const user = require('./signuser');



//view Engine
app.set('view engine', 'ejs');
app.set('views', 'view');

// body parser middelware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
// Set Static path
app.use(express.static(path.join(__dirname, 'static')));


app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}));
app.listen(8000);


app.get("/", start);
app.get("/index", home);
app.get("/register", register);
app.get("/inloggen", inloggen);
app.get("/chats", chats);
app.get("/profile", profile);
app.get("/edit", edit);
app.get("/userprofile", userprofile);
app.get("/notification", notification);
app.get("/setting", setting);
app.get('/log-out', logout);


function logout(req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      next(err);
    } else {
      res.redirect('/inloggen');
      console.log('Je bent nu uitgelogd');
    }
  });
}
function start(req, res) {
  res.render('pages/start.ejs', {
    title: "start"
  });
}

function register(req, res) {
  db.users.find(function (docs) {
  res.render('pages/register.ejs', {
    title: "register",
    users: docs
  });
});
}
app.post('/users/add', function (req, res) {
      // var newUser = { studenten_nummer, password, first_name, opleiding, leeftijd, overJezelf } + reg.body;
      var newUser = { 
        studenten_nummer: req.body.studenten_nummer,
        password: req.body.password,
        first_name: req.body.first_name,
        opleiding: req.body.opleiding,
        leeftijd: req.body.leeftijd,
        overJezelf: req.body.overJezelf
      };
      console.log('Registeren is gelukt');
      res.redirect("../userprofile");
      db.users.insert(newUser);
    }
);

app.get('/users/delete', function (req, res) {    
  db.users.remove( {});
    console.log('Account is gewist');
    res.redirect("../");
  }
);

function inloggen(req, res) {
  db.users.find(function (docs) {
  res.render('pages/inloggen.ejs', {
    title: "inloggen",
    user: req.session.user,
    users: docs
  });
});
}
// app.get('/users/signin', function (req, res) {
 
//   db.users.findOne({studenten_nummer: req.body.studenten_nummer, password: req.body.password});
//     console.log("gelukt");
//     res.redirect("../");
// });

app.get('/users/signin', function (req, res) {
  // var newUser = { studenten_nummer, password, first_name, opleiding, leeftijd, overJezelf } + reg.body;
  var new2User = { 
    studenten_nummer: req.body.studenten_nummer,
    password: req.body.password
  };
  db.users.findOne(new2User);
  console.log('Registeren is gelukt');
  res.redirect("../userprofile");
  
}
);

function home(req, res) {
  res.render('pages/index.ejs', {
    title: "Home",
    user: req.session.user
  });
}



function chats(req, res) {
  res.render('pages/chats.ejs', {
    title: "chats",
    user: req.session.user
  });
}

function edit(req, res) {
  db.users.find(function (docs) {
    res.render('pages/edit.ejs', {
      title: "Edit",
      users: docs,
      user: req.session.user
    });
});
}
app.post('/users/edit', function (req, res) {
  
    db.users.update( {}, { 
      "first_name" : req.body.first_name,
      "opleiding": req.body.opleiding,
      "leeftijd": req.body.leeftijd,
      "overJezelf": req.body.overJezelf
    } );
    console.log('Profile is aangepast');
    res.redirect("../userprofile");
    
  }
);

function profile(req, res) {
  res.render('pages/profile.ejs', {
    title: "profile",
    user: req.session.user
  });
}

function userprofile(req, res) {
  db.users.find(function (err, docs) {
    console.log(docs);
    res.render('pages/userprofile.ejs', {
      title: "userprofile",
      users: docs,
      user: req.session.user
    });
  });

}


function notification(req, res) {
  res.render('pages/notification.ejs', {
    title: "notification",
    user: req.session.user
  });
}

function setting(req, res) {
  res.render('pages/setting.ejs', {
    title: "setting",
    user: req.session.user
  });
}
app.use(function (req, res, next) {
  res.status(404).render('not-found');
});

app.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log(`Server started on port 3000`);
});
