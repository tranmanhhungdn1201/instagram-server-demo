const Like = require("../models/like.model");

module.exports = {
  // list all likes post
  index: (req, res) => {
    Like.find({}, (err, likes) => {
      res.json(likes);
    });
  },
  create: (req, res) => {
    const idPost = req.body.idPost;
    const like = {
      postId: idPost,
      userId: req.currentUser._id
    };
    Like.create(like, (err, like) => {
      if (err) return res.json({ success: false, code: err.code });
      res.json({
        like: like,
        success: true
      });
    });
  },
  destroy: (req, res) => {
    const idPost = req.body.idPost;
    const like = {
      postId: idPost,
      userId: req.currentUser._id
    };
    Like.deleteOne(like, (err, like) => {
      res.json({
        success: true
      });
    });
  },
  // list all likes posts by user
  getLikeByUserId: (req, res) => {
    const userId = req.currentUser._id;
    Like.find({ userId: userId }, (err, likes) => {
      res.json(likes);
    });
  }
};
