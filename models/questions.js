const mongoose = require('mongoose');

const questionsSchema = mongoose.Schema({
quizType: String,
quizDate: String,
  question: String,
  options: Array,
  correctAnswer: String,

})

module.exports.Question = mongoose.model('Question', questionsSchema);
