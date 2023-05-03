const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const User = require("../models/authModel");

const postComment = async (req, res, next) => {
  const { content, postId, userName } = req.body;
  let rate = parseInt(req.body.rate);
  try {
    const exsistRate = await Comment.find({
      postId,
      userName,
      rate: { $exists: true, $gt: 0 },
    });
    if (exsistRate.length !== 0 && rate !== 0) {
      throw Error("You already rated user");
    }
    /*RATE */
    rate = rate === 0 ? null : rate;
    let newComment = await Comment.create({
      content,
      postId,
      userId: req.user,
      rate,
    });

    const rates = await Comment.find({
      postId,
      rate: { $exists: true, $gt: 0 },
    }).select({
      rate: 1,
      _id: 0,
    });
    let sum = 0;
    rates.forEach((rate) => {
      sum = sum + rate.rate;
    });

    const l = rates.length === 0 ? 1 : rates.length;
    sum = sum / l;
    sum.toFixed(2);
    console.log(sum);
    var postRate = await Post.findOneAndUpdate(
      {
        _id: postId,
      },
      { $set: { rate: sum } },
      { returnOriginal: false }
    );

    const user = await User.findOne({ _id: req.user }, { _id: 0, password: 0 });
    newComment = { ...user._doc, ...newComment._doc };
    res.json({ newComment, postRate });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
const getComments = async (req, res) => {
  const { postId } = req.body;
  try {
    let allComments = await Comment.find({ postId }).sort({ _id: -1 });
    const commentsWithImages = await Promise.all(
      allComments.map(async (comment) => {
        const user = await User.findOne(
          { _id: comment.userId },
          { _id: 0, password: 0 }
        );
        const userAndComment = { ...user._doc, ...comment._doc };
        return userAndComment;
      })
    );
    res.json(commentsWithImages);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
const deleteComment = async (req, res) => {
  const { _id } = req.body;
  try {
    const deleteComment = await Comment.findById(_id);
    if (deleteComment === null) {
      throw Error("Comment doesnt exsist");
    }
    await deleteComment.remove();
    res.json(deleteComment);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
module.exports = {
  postComment,
  getComments,
  deleteComment /*
  updatePost,
  updateUser,*/,
};
