var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
  title: String,
  owners: [String],
  available: Boolean,
  bggId: Number,
  title: String,
  thumbnail: String,
  numPlayers: String,
  playTime: Number,
  description: String
});

module.exports = mongoose.model('Game', gameSchema);

