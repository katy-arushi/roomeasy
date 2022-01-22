var express = require('express');
var models = require('../models');
var router = express.Router();

// GET all users.
router.get('/', function(req, res, next) {
  models.User.findAll().then(function(users) {
    var result = users.map(function(user) {
      return models.userToJSON(user);
    });
    res.json(result);
  }).catch(next);
});

// POST a new user.
router.post('/', function(req, res, next) {
  var c = {id: req.body.id, name: req.body.name};
  models.User.create(c).then(function(user) {
    res.json(models.userToJSON(user));
  }).catch(next);
});

// GET one user.
router.get('/:id', function(req, res, next) {
  var id = parseInt(req.params.id);
  models.User.findById(id).then(function(user) {
    res.json(models.userToJSON(user));
  }).catch(next);
});

module.exports = router;