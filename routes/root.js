var express = require('express');
var router = express.Router();
//const Client = require('../models/client');

const db = require('../models/index');
const User = db["User"];

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.type("text/plain");
  //res.send('Node.js Sequelize test server');
  res.render('pages/homepage');
});


router.get('/createUser', function(req, res, next) {
  //res.type("text/plain");
  //res.send('Node.js Sequelize test server');
  res.render('/createUser');
});

router.get('/ping', function (req, res, next) {
  res.type("text/plain");
  res.send('node/sequelize');
});

router.get('/displayUser', async (req, res, next) => {
  //res.type("text/plain");
  //res.send('Node.js Sequelize test server');
  try {

    const users = await User.findAll();
    console.log(users.every(user => user instanceof User)); // true
    console.log("All client:", JSON.stringify(users, null, 2));
    res.render('/displayUser', { users });
  } catch (e) {
    next(e);
  }
});
module.exports = router;