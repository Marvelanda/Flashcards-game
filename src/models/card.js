const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
