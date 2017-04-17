const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WordsSchema = new Schema ({
  word: String,
  score: Number
});

const TodoSchema = new Schema ({
  item: String,
  avScore: Number,
  words: [WordsSchema]
});


const Todo = mongoose.model("todo", TodoSchema);

module.exports = Todo;
