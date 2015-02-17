var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var gameSchema = new Schema({
  title: { type: String, unique: true, required:true },
  owners: [{
    name: String,
    slackId: String,
    available: Boolean
  }],
  bggId: { type: Number, unique: true },
  thumbnail: String,
  numPlayers: String,
  playTime: Number,
  description: String
});

gameSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Game', gameSchema);

