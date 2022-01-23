
const Sequelize = require('sequelize-cockroachdb');

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const port = process.env.PORT || 3001;

const db = require('./models/index');
const Client = db["Client"];
const Account = db["Account"];

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

// // Define the Account model for the "accounts" table.
// const Account = db.sequelize.define("accounts", {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//   },
//   balance: {
//     type: Sequelize.INTEGER,
//   },
// });

app.post("/signup", (req, res) => {

  var firstName = req.body.first_name;
  var lastName  = req.body.last_name;
  var pass= req.body.password;
  var mail = req.body.email;

  // Create the "accounts" table.
  Client.sync({
    force: false,
  })
    .then(function () {
      // Insert two rows into the "accounts" table.
      return Client.bulkCreate([
        {
          first_name : firstName,
          last_name : lastName,
          password : pass,
          email : mail,
        },
        {
          first_name : 'Lara',
          last_name : 'Croft',
          password : pass,
          email : mail,
        },
      ]);
    })
    .then(function () {
      // Retrieve accounts.
      return Client.findAll();
    })
    .then(function (clients) {
      // Print out the balances.
      clients.forEach(function (client) {
        console.log(client.id + " " + client.first_name+ " " + client.last_name+ " " + client.email+ " " + client.password);
        
      });
     // res.send('Submitted Successfully!<br /> Account:  '+ clients[0].id +'<br />balance:  ' + clients[0].balance);
      res.send('Submitted Successfully!<br /> Name:  ' + clients[0].first_name + '<br />mail:  ' + clients[0].email+ '<br />lastname:  ' + clients[0].last_name);
      
      //process.exit(0);
    })
    .catch(function (err) {
      console.error("error: " + err.message);
      process.exit(1);
    });
});

  
module.exports = app;
