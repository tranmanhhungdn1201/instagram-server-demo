const Post = require("../models/post.model");
const User = require("../models/user.model");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});
module.exports = {
  // list all posts
  index: (req, res) => {
    Post.find({}, (err, posts) => {
      res.json({
        success: true,
        posts: posts
      });
    }).populate("user");
  },
  //get post by user
  getPostByUser: async (req, res) => {
    const userName = req.params.userName;
    const user = await User.findOne({username: userName});
    Post.find({user: user}, (err, posts) => {
      res.json({
        success: true,
        posts: posts
      });
    }).populate('user');
  },
  // create a new post
  create: (req, res) => {
    const path = req.files[0].path;
    const uniqueFilename = new Date().toISOString();
    cloudinary.uploader.upload(
      path,
      { public_id: "instagram/" + uniqueFilename, tags: `post` },
      function(err, image) {
        if (err) return res.send(err);
        console.log("file uploaded to Cloudinary");
        const post = {
          caption: req.body.caption,
          user: req.currentUser._id,
          imageUrl: image.url
        };

        Post.create(post, (err, post) => {
          if (err) return res.json({ success: false, code: err.code });
          res.json({
            success: true,
            message: "Post created.",
            post: post
          });
        });
      }
    );
  },
  comment: (req, res) => {
    const postId = req.body.idPost;
    const content = req.body.content;
    const date = Date.now();
    const comment = {
      username: req.currentUser.username,
      content: content,
      date: date
    };
    Post.findById(postId, function(err, post) {
      if (!err) {
        post.comments.push(comment);
        post.save(function(err) {
          res.json({
            success: true,
            comment: comment
          });
        });
      }
    });
  }
};
