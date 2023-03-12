const Category = require('../models/Category');

const addCategory = async (req, res) => {
  const { category } = req.params;
  const { time } = req.body;

  try {
    const cat = await Category.create({
      name: category,
      questions: [],
      time: time,
      live: false,
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
    res.status(500).json({ error: 'Error occured' });
  }
};

const getAllCaletgories = async (req, res) => {
  try {
    const categories = await Category.find()
      .select('name')
      .select('time')
      .select('live');

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error occured' });
  }
};

const setLive = async (req, res) => {
  const { category } = req.params;

  try {
    const cat = await Category.findOne({ name: category }).select('live');

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
    res.status(500).json({ error: 'Error occured' });
  }
};

module.exports = { addCategory, checkLive, getAllCaletgories, setLive };
