const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const port = 3000
const expressValidator = require('express-validator');
var mongojs = require('mongojs')
var db = mongojs('datingapp', ['users'])
var ObjectId = mongojs.ObjectID



const app = express();
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

//global Vars
// app.use(function(req, res, next){
//   res.locals.errors = null
//   next();
// });
app.use(function (req, res, next) {
  res.locals.errors = null
  next();
});

//Express Validator middleware
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split(','),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));



// var users = [{

//     in: 1,
//     first_name: 'Axel',
//     leeftijd: '21',
//     opleiding: 'CMD',
//     overJezelf: 'Ik zit in een band'


//   }


// ]


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
  db.users.find(function (err, docs) {
    console.log(docs);
    res.render('pages/userprofile.ejs', {
      title: "userprofile",
      users: docs
    });
  })

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


function register(req, res) {
  db.users.find(function (err, docs) {
  res.render('pages/register.ejs', {
    title: "register",
    users: docs
  });
})
}
app.post('/users/add', function (req, res) {
    // console.log(req.body.first_name);

    req.checkBody('first_name', 'Voornaam is verplicht').notEmpty;
    req.checkBody('opleiding', 'Opleiding is verplicht').notEmpty;
    req.checkBody('leeftijd', 'Leeftijd is verplicht').notEmpty;
    req.checkBody('overJezelf', 'Over jezelf is verplicht').notEmpty;


      var newUser = {
        first_name: req.body.first_name,
        opleiding: req.body.opleiding,
        leeftijd: req.body.leeftijd,
        overJezelf: req.body.overJezelf
      }
      
      console.log('Registeren is gelukt');
      res.redirect("../userprofile");
      db.users.insert(newUser, function (err, result) {
        if (err) {
          console.log(err); 
        }
      }); 
    })

app.delete('/users/delete/:id', function(req, res){
  db.users.remove({_id: ObjectId(req.params.id)}),function(err, result){
    if(error){
      console.log(err); 
    }
    res.redirect('../userprofile');
  }
});

app.listen(port, function () {
  console.log(`Server started on port 3000`);
})