const Category = require('../models/Category');
const Question = require('../models/Question');
const User = require('../models/User');

/*
  1. here we will get user id (name, email, contact, category -> as parameter)
  2. will assign random questions to user (if not assigned yet)
  3. add questions to user collection
*/
const getQuiz = async (req, res) => {
  const { category } = req.params;
  const { name, email, contact } = req.body;

  try {
    const exist = await User.findOne({ name, email, contact, category });

    if (exist) {
      if (exist.submitted) {
        return res
          .status(500)
          .json({ error: 'You have already attempted the quiz.' });
      }

      const quiz = await Question.find({ _id: { $in: exist.questions } });

      return res.status(200).json(quiz);
    }

    const quiz = await Question.find({ category });

    const shuffled = quiz.sort(() => 0.5 - Math.random());

    const random = shuffled.slice(0, 3);

    let questions = [];
    random.map((shuff) => {
      questions.push(shuff._id.toString());
    });

    const user = await User.create({
      name,
      email,
      contact,
      category,
      score: 0,
      time: 0,
      questions,
      answers: [],
    });

    res.status(200).json(random);
  } catch (error) {
    res.status(500).res.json({ error: 'Error occured while getting quiz.' });
  }
};

const addQuiz = async (req, res) => {
  const { category } = req.params;
  const { question, options, answer } = req.body;

  try {
    const quiz = await Question.create({
      category,
      question,
      options,
      answer,
    });

    const cat = await Category.updateOne(
      { name: category },
      { $push: { questions: quiz._id } }
    );

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).res.json({ error: 'Error occured while adding question' });
  }
};

const submitQuiz = async (req, res) => {
  const { category } = req.params;

  const { name, email, contact, answers } = req.body;

  try {
    const user = await User.updateOne(
      { name, email, contact, category },
      { $set: { answers: answers } }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).res.json({ error: 'Cannot update quiz' });
  }
};

const increaseTime = async (req, res) => {
  const { category } = req.params;

  const { name, email, contact } = req.body;

  try {
    const user = await User.updateOne(
      { name, email, contact, category },
      { $inc: { time: 30 } }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Cannot update time' });
  }
};

const endQuiz = async (req, res) => {
  const { category } = req.params;

  const { name, email, contact } = req.body;

  try {
    const user = await User.updateOne(
      { name, email, contact, category },
      { $set: { submitted: true } }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Cannot update time' });
  }
};

module.exports = { getQuiz, addQuiz, submitQuiz, increaseTime, endQuiz };
