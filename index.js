
const express = require('express')
const app = express()
const port = 8000

app.get('/', function (req, res) {
  res.send('ayyyyy you are connected!')
})
// express.get('/', (req, res) => res.send('ayyyyy you are connected!'))

express()
.use(express.static('static'))
.set('view engine', 'ejs')
.set('views', 'view')
