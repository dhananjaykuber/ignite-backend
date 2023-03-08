const Category = require('../models/Category');

const addCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const cat = await Category.create({
      name: category,
      questions: [],
    });

    res.status(200).json(cat);
  } catch (error) {
    res.status(500).json({ error: 'Error occured, cannot add category.' });
  }

  res.status(200).json({ message: 'add category' });
};

module.exports = { addCategory };
