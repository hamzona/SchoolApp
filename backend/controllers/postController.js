const Post = require("../models/postModel");

const addPost = async (req, res) => {
  const { title, price, description, subject, jobType } = req.body;

  try {
    if (!title) {
      throw Error("Title is required");
    }
    const newPost = await Post.create({
      userName: req.userName,
      title: title,
      description: description,
      price: price,
      subject: subject,
      jobType: jobType,
      userId: req.user,
      rate: 0,
      date: new Date(),
    });

    res.json(newPost);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const getAllMyPosts = async (req, res) => {
  try {
    const myPosts = await Post.find({ userId: req.user }).sort({ _id: -1 });

    res.json(myPosts);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const deletePost = async (req, res) => {
  const { _id } = req.body;
  try {
    const deletePost = await Post.findOne({ _id });
    await deletePost.remove();
    res.json(deletePost);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
const updatePost = async (req, res) => {
  const { _id, title } = req.body;

  try {
    const updatePost = await Post.findOne({ _id });
    updatePost.title = title;
    await updatePost.save();
    res.json(updatePost);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
module.exports = {
  addPost,
  deletePost,
  updatePost,
  getAllMyPosts,
};
