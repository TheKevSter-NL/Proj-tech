const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.set('view engine', 'ejs')
app.set('views', 'view')
app.use(express.static('static'));


app.get("/", home),
app.get("/chats", chats)
app.get("/profile", profile)
app.get("/edit", edit)
app.get("/userprofile", userprofile)
app.get("/notification", notification)
app.get("/setting", setting)



app.use(function(req, res, next) {
  res.status(404).render('not-found');
});

app.post('/', function(req, res) {
  res.send('Got a POST request')
})

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
    title: "userprofile"
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
