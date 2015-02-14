module.exports = {
  // Make sure to return the proper url for Heroku
  url: process.env.MONGOLAB_URI || 'mongodb://localhost/tabletop-api'
};