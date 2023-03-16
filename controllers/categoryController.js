const Category = require('../models/Category');
const Question = require('../models/Question');
const User = require('../models/User');

const addCategory = async (req, res) => {
  const { category } = req.params;
  const { time } = req.body;

  try {
    const cat = await Category.create({
      name: category,
      questions: [],
      time: time,
      live: false,
      adminId: req.admin._id,
    });

    res.status(200).json(cat);
  } catch (error) {
    res.status(500).json({ error: 'Error occured, cannot add category.' });
  }
};

const checkLive = async (req, res) => {
  const { category } = req.params;

  try {
    const live = await Category.findOne({ name: category });

    res.status(200).json({ live: live.live });
  } catch (error) {
    res.status(500).json({ error: `Error occured: ${error}` });
  }
};

const getAllCaletgories = async (req, res) => {
  try {
    const categories = await Category.find({ adminId: req.admin._id })
      .select('name')
      .select('time')
      .select('live');

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: `Error occured: ${error}` });
  }
};

const setLive = async (req, res) => {
  const { category } = req.params;

  try {
    const cat = await Category.findOne({
      name: category,
      adminId: req.admin._id,
    }).select('live');

    if (cat.live) {
      const live = await Category.updateOne(
        { name: category },
        {
          $set: {
            live: false,
          },
        }
      );

      return res.status(200).json({ message: 'Live set to false' });
    }

    const live = await Category.updateOne(
      { name: category },
      {
        $set: {
          live: true,
        },
      }
    );

    res.status(200).json({ message: 'Live set to true' });
  } catch (error) {
    res.status(500).json({ error: `Error occured: ${error}` });
  }
};

const getQuestions = async (req, res) => {
  const { category } = req.params;

  try {
    const quiz = await Category.findOne({ name: category });

    let questions = [];
    for (const question in quiz.questions) {
      const ques = await Question.findById(quiz.questions[question]);
      questions.push(ques);
    }

    return res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: `Error occured: ${error}` });
  }
};

const calculateResult = async (req, res) => {
  const { category } = req.params;

  try {
    const entries = await User.find({
      category: category,
    });

    entries.sort((a, b) => a.time - b.time);

    entries.sort((a, b) => b.score - a.score);

    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: `Error occured: ${error}` });
  }
};

module.exports = {
  addCategory,
  checkLive,
  getAllCaletgories,
  setLive,
  getQuestions,
  calculateResult,
};
