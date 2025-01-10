import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  body: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const Post = mongoose.model("Post", postSchema);

export { Post }