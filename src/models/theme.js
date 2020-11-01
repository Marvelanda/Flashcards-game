const mongoose = require("mongoose");
const Card = require("./card");

const themeSchema = new mongoose.Schema({
  title: String,
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
});

const Theme = mongoose.model("Theme", themeSchema);

module.exports = Theme;
