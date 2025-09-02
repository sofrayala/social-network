import mongoose from "mongoose";
import { type } from "os";

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
