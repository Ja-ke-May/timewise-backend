const mongoose = require('mongoose');

const leaderboardSchema = mongoose.Schema({
quizType: String,
quizDate: String,
  userName: String,
  totalScore: Number,

})

module.exports.Leaderboard = mongoose.model('Leaderboard', leaderboardSchema)