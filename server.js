/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongo = require('mongodb');
const mongojs = require('mongojs');
const db = mongojs('datingapp', ['users']);
const port = process.env.DB_PORT;
const mongoosLogin = require('./mongoose');
const multer  = require('multer');




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

// Sessions
app.use(session({
  resave: false,
  saveUninitialized: true,
  host: process.env.DB_HOST,
  db_name: process.env.DB_NAME,
  secret: process.env.SESSION_SECRET,
  port: process.env.PORT,
}));
app.listen(process.env.PORT);


app.get("/", start);
app.get("/index", home);
app.get("/register", register);
app.get("/uploadprofile", uploadprofile);
app.get("/inloggen", inloggen);
app.get("/chats", chats);
app.get("/profile", profile);
app.get("/edit", edit);
app.get("/userprofile", userprofile);
app.get("/notification", notification);
app.get("/setting", setting);
app.get('/log-out', logout);



// Storage Engine
const storage = multer.diskStorage({
  destination: './static/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname +  path.extname(file.originalname));
  } 
});
// upload

const upload = multer({ storage: storage }).single('profile-pic');

app.post('/users/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.redirect('pages/uploadprofile.ejs', { msg: err});
     } 
     else {
       console.log(req.file);
       res.redirect('/userprofile');

    }
  });
});


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
function uploadprofile(req, res) {
  res.render('pages/uploadprofile.ejs', {
    title: "profile-uploaden",
    users: req.session.user,
    mongoosLogin: req.session.mongoosLogin
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
      res.redirect("../uploadprofile");
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
    users: docs,
    mongoosLogin: req.session.mongoosLogin
  });
});
}

app.post('/users/signin', function(req, res) {
  
  studenten_nummer= req.body.studenten_nummer;
  process.env.PASSWORD = req.body.password;

  mongoosLogin.findOne({studenten_nummer: studenten_nummer, password: process.env.PASSWORD}, function(err, mongoosLogin){
    if(err){
      console.log(err);
      console.log('Error');
      return res.redirect('/inloggen');
    }
    if(!mongoosLogin){
      
      console.log('Inloggen mislukt');
      return res.redirect('/inloggen');
      
    }
    req.session.mongoosLogin = mongoosLogin;
    console.log('Inloggen gelukt');
    return res.status(200).send, res.redirect('/index');
    
  
    });
  });

 app.get('/user-check' ,function(req, res){
  
  if(!req.session.mongoosLogin) {
    return res.status(401).send();
  }
  req.session.mongoosLogin = mongoosLogin;
  return  res.status(200).send(process.env.SESSION_SECRET);

});


function home(req, res) {
  res.render('pages/index.ejs', {
    title: "Home",
    mongoosLogin: req.session.mongoosLogin
  });
}



function chats(req, res) {
  res.render('pages/chats.ejs', {
    title: "chats",
    mongoosLogin: req.session.mongoosLogin
  });
}

function edit(req, res) {
  db.users.find(function (docs) {
    res.render('pages/edit.ejs', {
      title: "Edit",
      users: docs,
      mongoosLogin: req.session.mongoosLogin
    });
});
}
app.post('/users/edit', function (req, res) {
  
    db.users.update( {}, { 
      studenten_nummer: req.body.studenten_nummer,
        password: req.body.password,
        first_name: req.body.first_name,
        opleiding: req.body.opleiding,
        leeftijd: req.body.leeftijd,
        overJezelf: req.body.overJezelf
    } );
    console.log('Profile is aangepast');
    res.redirect("../uploadprofile");
    
  }
);

function profile(req, res) {
  res.render('pages/profile.ejs', {
    title: "profile",
    mongoosLogin: req.session.mongoosLogin
  });
}

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


function notification(req, res) {
  res.render('pages/notification.ejs', {
    title: "notification",
    mongoosLogin: req.session.mongoosLogin
  });
}

function setting(req, res) {
  res.render('pages/setting.ejs', {
    title: "setting",
    mongoosLogin: req.session.mongoosLogin
  });
}
app.use(function (req, res, next) {
  res.status(404).render('not-found');
});

app.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log(`Server started on port 3000`);
});
