const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");

const bcrypt = require("bcryptjs");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
dotenv.config();
mongoose.set("strictQuery", true);
// mongoose.set("useCreateIndex", true);
app.use(express.urlencoded({ extended: true }));
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `The server is running on http://localhost:${process.env.PORT}`
    );
  });
});

// Routes

app.use("/", authRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);
