var Vote = require('../models/vote');
var express = require('express');
var router = express.Router();

/* GET List all votes */
router.get('/', function(req, res) {
  Vote.find(function (err, votes) {
    if (err) {
      return res.send(err);
    }
    res.json(votes);
  });
});

module.exports = router;