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


/* POST Create a vote */
router.post('/', function(req, res) {
  var vote = new Vote(req.body);
  console.log(req.body);
  vote.save(function (err, savedVote) {
    if (err) {
      return res.send(err);
    }
    Vote.populate(savedVote, {path:'game'},function (err, populated) {
      if (err) {
        return res.send(err);
      }
      res.send(populated);
    });
  })
});

module.exports = router;