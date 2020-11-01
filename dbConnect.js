require('dotenv').config();
const mongoose = require('mongoose');

const dbName = process.env.DB_NAME;
const dbPath = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${dbName}`;

const dbConnect = () => {
  mongoose
    .connect(dbPath, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Welcome to - ', dbPath))
    .catch((err) => {
      console.log('Error', err);
    });
};

module.exports = dbConnect;
