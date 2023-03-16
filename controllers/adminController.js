const Admin = require('../models/Admin');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username, password });

    if (!admin) {
      return res.status(400).json({ error: 'Not found' });
    }

    const token = createToken(admin._id);

    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.create({ username, password });

    const token = createToken(admin._id);

    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const resetTest = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await User.deleteOne({ _id: id });

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { login, signup, resetTest };
