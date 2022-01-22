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
  res.render("homepage");
});

app.get('/profile', function(req, res) {
  res.render('profile');
});



app.get('/createUser', function(req, res, next) {
  //res.type("text/plain");
  //res.send('Node.js Sequelize test server');
  res.render('createUser');
});


app.get('/displayUser', async (req, res, next) => {
  //res.type("text/plain");
  //res.send('Node.js Sequelize test server');
  try {

    const users = await User.findAll();
    console.log(users.every(user => user instanceof User)); // true
    console.log("All client:", JSON.stringify(users, null, 2));
    res.render('displayUser', { users });
  } catch (e) {
    next(e);
  }
});


module.exports = app;
