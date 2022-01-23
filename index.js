const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const port = process.env.PORT || 3001;

const db = require('./models/index').sequelize;
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

  // -------------------------------------- GET ROUTE HANDLERS -------------------------------------- //

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

  // ------------------------------------ POST ROUTE HANDLERS --------------------------------------- //

app.post("/signup", (req, res) => {
  db.query(
    `INSERT INTO users (first_name, last_name, password, email)
      VALUES ($1, $2, $3, $4) returning *`, // insert register form values into db
    [
      req.body.first_name, // these are the register form values to insert into db
      req.body.last_name,
      req.body.password,
      req.body.email,
    ]
  )
    .then((data) => {
      const user = data.rows[0]; // get the user, which is the first row of the results
      res.redirect("/q1");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

module.exports = app;
