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

      let quiz = [];
      for (const question in exist.questions) {
        const ques = await Question.findById(exist.questions[question]);
        quiz.push(ques);
      }

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
      answers: new Array(questions.length).fill(''),
    });

    res.status(200).json(random);
  } catch (error) {
    res.status(500).json({ error: 'Error occured while getting quiz.' });
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
    res.status(500).json({ error: 'Error occured while adding question' });
  }
};

const submitQuiz = async (req, res) => {
  const { category } = req.params;

  const { name, email, contact, index, option } = req.body;

  try {
    const user = await User.updateOne(
      { name, email, contact, category },
      { $set: { [`answers.${index}`]: option } }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Cannot update quiz' });
  }
};

const increaseTime = async (req, res) => {
  const { category } = req.params;

  const { name, email, contact } = req.body;

  try {
    const user = await User.updateOne(
      { name, email, contact, category },
      { $inc: { time: 10 } }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Cannot update time' });
  }
};

const endQuiz = async (req, res) => {
  const { category } = req.params;

  const { name, email, contact, time } = req.body;

  try {
    const user = await User.updateOne(
      { name, email, contact, category },
      { $set: { submitted: true, time: time } }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Cannot update time' });
  }
};

const getAnswers = async (req, res) => {
  const { category } = req.params;

  const { name, email, contact } = req.body;

  try {
    const user = await User.findOne({ name, email, contact, category }).select(
      'answers'
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Cannot get answers' });
  }
};

const getTime = async (req, res) => {
  const { category } = req.params;

  const { name, email, contact } = req.body;

  try {
    const user = await User.findOne({ name, email, contact, category }).select(
      'time'
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Cannot get time' });
  }
};

const calculateScores = async (req, res) => {
  const { category } = req.params;

  try {
    const users = await User.find({ category: category });

    for (const user in users) {
      const tempUser = users[user];

      let answers = [];
      for (const question in tempUser.questions) {
        const ans = await Question.findById(
          tempUser.questions[question]
        ).select('answer');
        answers.push(ans.answer);
      }

      const userAnswers = tempUser.answers;

      let score = 0;
      for (const ans in answers) {
        if (answers[ans] === userAnswers[ans]) {
          score++;
        }
      }

      const updated = await User.updateOne(
        {
          name: tempUser.name,
          email: tempUser.email,
          contact: tempUser.contact,
          category,
        },
        { $set: { score: score } }
      );
    }

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot update scores' });
  }
};

const getTotalTime = async (req, res) => {
  const { category } = req.params;

  try {
    const cat = await Category.findOne({ name: category }).select('time');

    res.status(200).json(cat);
  } catch (error) {
    res.status(500).json({ error: 'Cannot get time' });
  }
};

const getEntries = async (req, res) => {
  const { category } = req.params;

  try {
    const users = await User.find({ category: category })
      .select('-questions')
      .select('-answers');

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Cannot get entries' });
  }
};

const deleteQuiz = async (req, res) => {
  const { category } = req.params;
  const { id } = req.query;

  try {
    const cat = await Category.updateOne(
      { name: category },
      {
        $pull: {
          questions: id,
        },
      }
    );

    const quiz = await Question.deleteOne({ _id: id });

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Cannot delete quiz' });
  }
};

module.exports = {
  getQuiz,
  addQuiz,
  submitQuiz,
  increaseTime,
  endQuiz,
  getAnswers,
  getTime,
  calculateScores,
  getTotalTime,
  getEntries,
  deleteQuiz,
};
