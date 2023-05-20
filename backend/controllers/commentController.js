const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const User = require("../models/authModel");

const postComment = async (req, res, next) => {
  const { content, postId, userName, imagesNames } = req.body;
  try {
    /*RATE */

    let newComment = await Comment.create({
      content,
      postId,
      userId: req.user,
      commentImgsNames: imagesNames,
    });

    res.json(newComment);
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
