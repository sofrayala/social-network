import express from "express";
import bodyParser from "body-parser";
import Post from "./models/post.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

mongoose
  .connect(
    `mongodb+srv://sofiarayala1995:${process.env.MONGODB_PASSWORD}@cluster0.kyn7ojp.mongodb.net/node-angular?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("Connected to data base!");
  })
  .catch(() => {
    console.log("Connection to db failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();
  res.status(201).json({
    message: "Post added successfully",
  });
});
app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted" });
  });
});

export default app;
