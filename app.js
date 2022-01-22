var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const cors = require("cors");
const logger = require("morgan")
var models = require('./models');

//const Client = require('./models/client');
//const rootRoutes = require('./routes/root');
//const clientRoutes = require('./routes/user');

const port = process.env.PORT || 3001;

var app = express();

//app.head

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser())
//app.use(bodyParser.json({type: "*/*"}));
//app.use(bodyParser.urlencoded({ extended: false }))
//app.use('/', require('./routes/root'));
app.use('/', require('./routes/root'));
//app.use('/clients', clientRoutes);
app.use('/user', require('./routes/user'));
//app.use('/order', require('./routes/order'));
//app.use('/product', require('./routes/product'));

// Automatically create database tables for our Sequelize models then start the
// HTTP server.
models.sequelize.sync().then(function() {
  app.listen(port, function () {
      console.log("Listening on port " + this.address().port)
  });
});



module.exports = app;
