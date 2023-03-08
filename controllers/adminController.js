const login = async (req, res) => {
  res.status(200).json({ message: 'login' });
};

module.exports = { login };
