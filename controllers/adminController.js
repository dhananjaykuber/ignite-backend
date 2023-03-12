const Admin = require('../models/Admin');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username, password });

    if (!admin) {
      return res.status(400).json({ error: 'Not found' });
    }

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.create({ username, password });

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { login, signup };
