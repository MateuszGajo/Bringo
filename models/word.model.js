const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wordSchema = new Schema({
  level: {
    type: String,
    required: true
  },
  words: [
    {
      pl: String,
      en: String
    }
  ]
});

module.exports = mongoose.model("word", wordSchema, "words");
