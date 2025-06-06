// Authored by Allie, Quinton, Lina
// 6/5/25 CSC 3221
// Task modeling adn defintion

const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide a task name"],
    maxlength: [50, "name can not be more than 50 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("tasks", TaskSchema);
