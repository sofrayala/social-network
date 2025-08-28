import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postsRoutes from "./routes/posts.js";

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
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

export default app;
