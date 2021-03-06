var Game = require('../models/game');
var bggLookup = require('../utils/bggLookup');
var express = require('express');
var router = express.Router();
var _ = require('lodash');

/////////
/// Utils
/////////

var createGame = function (gameRequest, res) {
  var game = new Game(gameRequest);

  game.save(function (err, game) {
    if (err) {
      return res.send(err);
    }
    res.json(game);
  })
};

/////////
/// Routes
/////////

/* GET List all games */
router.get('/', function(req, res) {
  Game.find(function (err, games) {
    if (err) {
      return res.send(err);
    }
    res.json(games);
  });
});

/* GET Get one game */
router.get('/:id', function (req, res) {
  Game.findById(req.params.id, function (err, game) {
    if (err) {
      return res.send(err);
    }
    res.json(game);
  })
});

/* GET Get owners for one game */
router.get('/:id/owners', function (req, res) {
  Game.findById(req.params.id, function (err, game) {
    if (err) {
      return res.send(err);
    }
    res.json(game.owners);
  })
});

/* GET Get single owner for one game */
router.get('/:id/owners/:ownerId', function (req, res) {
  Game.findById(req.params.id, function (err, game) {
    if (err) {
      return res.send(err);
    }
    var toReturn = _.find(game.owners, function (x) {
      return x._id == req.params.ownerId
    });
    res.json(toReturn);
  })
});

/* POST Create a new game */
router.post('/', function(req, res) {
  if (req.body.bggId) {
    bggLookup(req.body.bggId, function (err, response) {
      if (err) {
        return res.send(err);
      }
      req.body.title = response.data.name;
      req.body.thumbnail = response.data.thumbnail;
      req.body.numPlayers = response.data.minPlayers + "-" + response.data.maxPlayers;
      req.body.playTime = response.data.playingTime;
      req.body.description = response.data.description;
      console.log(req.body);
      createGame(req.body, res);
    });
  } else {
    console.log("here2");
    createGame(req.body, res);
  }
});


router.put('/:id', function (req, res) {
  var updateObj = req.body;

  // Don't allow these because they are unique
  // Changing one of these requires deleting and creating
  // the game.
  delete updateObj._id;
  delete updateObj.title;
  delete updateObj.bggId;

  Game.findByIdAndUpdate(req.params.id, {
    $set: updateObj
  }, function (err, updatedGame) {
    if (err) {
      res.send(err);
    }
    res.send(updatedGame);
  });
});

router.put('/:id/owners/:ownerId', function (req, res) {
  var updateObj = req.body;

  delete updateObj._id;


  Game.findById(req.params.id, function (err, game) {
    if (err) {
      res.send(err);
    }

    var owner = game.owners.id(req.params.ownerId)

    for (var key in updateObj) {
      owner[key] = updateObj[key];
    }

    owner.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.send(owner);
    });


  });
});



module.exports = router;