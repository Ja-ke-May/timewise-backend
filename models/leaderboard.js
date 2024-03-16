const mongoose = require('mongoose');

const leaderboardSchema = mongoose.Schema({
quizType: String,
quizDate: String,
dateQuizTaken: Date,
  userName: String,
  totalScore: Number,

})

module.exports.Leaderboard = mongoose.model('Leaderboard', leaderboardSchema)