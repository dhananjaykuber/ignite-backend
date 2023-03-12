require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const quizRoute = require('./routes/quizRoute');
const adminRoute = require('./routes/adminRoute');
const categoryRoute = require('./routes/categoryRoute');

const app = express();

app.use(express.json());
app.use(cors());

// routes
app.use('/apinode/quiz', quizRoute);
app.use('/apinode/admin', adminRoute);
app.use('/apinode/category', categoryRoute);

app.get('/', (req, res) => {
  res.json({ message: 'hello' });
});

// connect mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, '0.0.0.0', () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
