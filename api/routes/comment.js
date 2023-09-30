const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Comment = require("../models/Comment");
const bcrypt = require("bcryptjs");
const Post = require("../models/Post");
const fs = require("fs");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const commentDoc = await Comment.find({ postId: id }).sort({ updatedAt: 1 });
  res.json(commentDoc);
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Comment.findByIdAndDelete(id);
  res.json(postDoc);
});

router.post("/", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.secret, {}, async (err, info) => {
    if (err) throw err;
    const { content, postId, authorInfo } = req.body;
    const commentDoc = await Comment.create({
      content,
      postId,
      authorInfo,
    });
    res.json(commentDoc);
  });
});

router.put("/", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, content, postId, authorInfo } = req.body;
    const CommentDoc = await Comment.findById(id);
    const isAuthor =
      JSON.stringify(CommentDoc.authorInfo.id) ===
      JSON.stringify(authorInfo.id);
    if (!isAuthor) {
      return res.status(400).json("you are not the author");
    }
    await CommentDoc.update({
      content,
      postId,
      authorInfo,
    });

    res.json(CommentDoc);
  });
});

module.exports = router;
