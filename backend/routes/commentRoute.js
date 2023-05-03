const express = require("express");
const auth = require("../middleware/authJwtMiddleware");
const route = express();
const {
  postComment,
  getComments,
  deleteComment /*
  updatePost,
  updateUser,*/,
} = require("../controllers/commentController");
route.post("/add", auth, postComment /* updatePost, updateUser*/);
route.post("/all", getComments);
route.delete("/delete", deleteComment);
module.exports = route;
