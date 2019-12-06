const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  difficulty: {
    type: String
  },
  score: {
    type: Number
  }
});

userSchema.methods.hashPassword = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = mongoose.model("user", userSchema, "users");
