const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const app = express()
const port = 3000



//view Engine
app.set('view engine', 'ejs')
app.set('views', 'view')

// body parser middelware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
// Set Static path
app.use(express.static(path.join(__dirname, 'static')))



var users = [{

    in: 1,
    first_name: 'Axel',
    studenten_nummer: 123456,
  

  }

]


// app.post('/users/add', function (reg, res) {
//   console.log('FORM SUCCES')

// });



app.get("/", start)
app.get("/index", home)
app.get("/register", register)
app.get("/inloggen", inloggen)
app.get("/chats", chats)
app.get("/profile", profile)
app.get("/edit", edit)
app.get("/userprofile", userprofile)
app.get("/notification", notification)
app.get("/setting", setting)






app.post('/', function (req, res) {
  res.send('Got a POST request')
})

function start(req, res) {
  res.render('pages/start.ejs', {
    title: "start"
  });
}

function register(req, res) {
  res.render('pages/register.ejs', {
    title: "register",
    users: users
  });
}
app.post('/users/add', function (req, res) {
  console.log(req.body.first_name);
  // var newUser = {
  //   first_name: req.body.firstname
  // }
  // console.log(newUser);
});


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
  res.render('pages/edit.ejs', {
    title: "edit"
  });
}

function profile(req, res) {
  res.render('pages/profile.ejs', {
    title: "profile"
  });
}

function userprofile(req, res) {
  res.render('pages/userprofile.ejs', {
    title: "userprofile",
    users: users
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
  console.log(`Server started on port 3000`);
})
