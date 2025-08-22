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
  const posts = [
    {
      id: "fash1234df",
      title: "First server-side post",
      content: "This is coming from the server",
    },
    {
      id: "kja1634df",
      title: "Second server-side post",
      content: "This is coming from the server!",
    },
  ];
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts,
  });
});

export default app;
