const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  title: {
    type: String,
    min: 5,
    max: 255,
    required: true,
  },
  text: {
    type: String,
    min: 5,
    max: 1024,
  },
  date: {
      type: Date,
      default:Date.now()
  },
  movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie'
  }

});

const Comment = mongoose.model("Comment", commentSchema);

exports.Comment = Comment
