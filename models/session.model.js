const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  words: {
    type: Array
  },
  sessionInfo: {
    amounts: {
      correctWords: Number,
      discorrectWords: Number,
      totalNumberOfWords: Number,
      procentCorrectness: Number,
      score: Number
    }
  }
});

module.exports = mongoose.model("sessions", sessionSchema, "session");
