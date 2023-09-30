const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CommentSchema = new Schema(
  {
    content: String,
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    authorInfo: {},
  },
  {
    timestamps: true,
  }
);

const CommentModel = model("Comment", CommentSchema);

module.exports = CommentModel;
