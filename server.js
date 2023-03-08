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
app.use('/api/quiz', quizRoute);
app.use('/api/admin', adminRoute);
app.use('/api/category', categoryRoute);

// connect mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
