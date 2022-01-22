const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const port = process.env.PORT || 3001;

app.set("view engine", "ejs");
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, function () {
  console.log("Runnning on " + port);
});

app.get('/', (req, res) => {
  res.render("homepage");
});

module.exports = app;
