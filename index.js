


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
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
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

app.get('/q4', function(req, res) {
  res.render('q4');
});

app.get('/q5', function(req, res) {
  res.render('q5');
});
  
app.get('/q6', function(req, res) {
  res.render('q6');
});

app.get('/q7', function(req, res) {
  res.render('q7');
});

app.get('/q8', function(req, res) {
  res.render('q8');
});

app.get('/q9', function(req, res) {
  res.render('q9');
});

app.get('/q10', function(req, res) {
  res.render('q10');
});

// app.post("/signup", (req, res) => {
//   db.query(
//     `INSERT INTO users(first_name, last_name, password, email)
//       VALUES($1, $2, $3, $4) returning *`, // insert register form values into db
//     [
//       req.body.first_name, // these are the register form values to insert into db
//       req.body.last_name,
//       req.body.password,
//       req.body.email,
//     ]
//   )
//     .then((data) => {
//       const user = data.rows[0]; // get the user, which is the first row of the results
//       res.redirect("/q1");
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).json({ error: err.message });
//     });
// });
app.post('/signup', function (req, res) {
 
  //Get our values submitted from the form
    
  var firstName = req.body.first_name;
  var lastName  = req.body.last_name;
  var password = req.body.password;
  var email = req.body.email;

  //Add our POST data to CockroachDB via Sequelize
  User.sync({
      force: false,
  })
      .then(function () {
      // Insert new data into People table
      return User.bulkCreate([
          {
          first_name : firstName,
          last_name : lastName,
          password : password,
          email :email,
          },
      ]);
      })

      //Error handling for database errors
      .catch(function (err) {
      console.error("error: " + err.message);
      });    
      
      //Tell them it was a success
      res.send('Submitted Successfully!<br /> Name:  ' + firstName + '<br />email:  ' + email);
});
  
module.exports = app;
