const express = require('express');
const mongoose = require('mongoose');
const port = 3001;
const cors = require('cors');
require("dotenv").config();
const { Leaderboard } = require("./models/leaderboard");
const { Question } = require("./models/questions");

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err.message);
  });

const app = express();

app.use(cors());
app.use(express.json());

app.post('/leaderboard', async (req, res) => {
  const { quizType, quizDate, dateQuizTaken, userName, totalScore } = req.body;

  try {
      const leaderboardEntry = new Leaderboard({
          quizType,
          quizDate,
          dateQuizTaken,
          userName,
          totalScore,
      });

      await leaderboardEntry.save();

      console.log('Leaderboard data saved successfully');
      res.status(201).send('Leaderboard data saved successfully');
  } catch (error) {
      console.error('Error saving leaderboard data:', error);
      res.status(500).send('Internal Server Error');
  }
});

app.get('/leaderboard', async (req, res) => {
  try {
    const { quizType, quizDate, dateQuizTaken } = req.query;

    let leaderboardData;

    if (dateQuizTaken) {
      leaderboardData = await Leaderboard.find({ quizType, dateQuizTaken });
    } else if (quizDate) {
      leaderboardData = await Leaderboard.find({ quizType, quizDate });
    } else {
      leaderboardData = await Leaderboard.find({ quizType });
    }

    res.status(200).json(leaderboardData);
  } catch (error) {
    console.error('Error retrieving leaderboard data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/questions', async (req, res) => {
    const { quizType, quizDate, question, options, correctAnswer } = req.body;
  
    try {
      const questionEntry = new Question({
        quizType,
        quizDate,
        question,
        options,
        correctAnswer,
      });

      await questionEntry.save();
  
      console.log('Question data saved successfully');
      res.status(201).send('Question data saved successfully');
    } catch (error) {
      console.error('Error saving Question data:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/questions', async (req, res) => {
    try {
      const { quizType, quizDate } = req.query;
      const questionsData = await Question.find({ quizType, quizDate });
      res.status(200).json(questionsData);
    } catch (error) {
      console.error('Error retrieving questions data:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  

app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
  
  module.exports = app;
  