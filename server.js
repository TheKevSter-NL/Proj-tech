/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;
const mongojs = require('mongojs');
const db = mongojs('datingapp', ['users']);




const app = express();
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
  res.render('pages/inloggen.ejs', {
    title: "inloggen"
  });
}

function home(req, res) {
  res.render('pages/index.ejs', {
    title: "Home"
  });
}

function chats(req, res) {
  res.render('pages/chats.ejs', {
    title: "chats"
  });
}

function edit(req, res) {
  db.users.find(function (docs) {
    res.render('pages/edit.ejs', {
      title: "Edit",
      users: docs
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
    title: "profile"
  });
}

function userprofile(req, res) {
  db.users.find(function (err, docs) {
    console.log(docs);
    res.render('pages/userprofile.ejs', {
      title: "userprofile",
      users: docs
    });
  });

}


function notification(req, res) {
  res.render('pages/notification.ejs', {
    title: "notification"
  });
}

function setting(req, res) {
  res.render('pages/setting.ejs', {
    title: "setting"
  });
}
app.use(function (req, res, next) {
  res.status(404).render('not-found');
});

app.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log(`Server started on port 3000`);
});