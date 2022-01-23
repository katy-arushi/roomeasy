const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const port = process.env.PORT || 3001;

const db = require('./models/index');
const User = db["User"];

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', require('./routes/user'));

app.listen(port, function () {
  console.log("Runnning on " + port);
});

app.get('/', (req, res) => {
  res.render("home2");
});

app.get('/signup', (req, res) => {
  res.render("signUp");
});

app.get('/login', (req, res) => {
  res.render("login");
});

app.get('/q1', function(req, res) {
  res.render('q1');
});

app.get('/q2', function(req, res) {
  res.render('q2');
});

app.get('/q3', function(req, res) {
  res.render('q3');
});

module.exports = app;
