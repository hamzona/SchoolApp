const express = require("express");
const route = express.Router();
const {
  addPost,
  deletePost,
  updatePost,
  getAllMyPosts,
  saveMultipleFileNames,
} = require("../controllers/postController");

//middleware
const authJwt = require("../middleware/authJwtMiddleware");
const { pagination } = require("../middleware/pagination");
const { filterPosts } = require("../middleware/filterPosts");
//get all
route.get("/allPosts", filterPosts, pagination);

//get allMyPosts
route.get("/allMy", authJwt, getAllMyPosts);

// add
route.post("/add", authJwt, addPost);

//delete
route.post("/delete", authJwt, deletePost);

//update
route.patch("/update", authJwt, updatePost);

module.exports = route;
