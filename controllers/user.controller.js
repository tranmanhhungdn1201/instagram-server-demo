const User = require("../models/user.model");
const Post = require("../models/post.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const signToken = require("../middleware/serverAuth").signToken;

module.exports = {
  // list all users
  index: (req, res) => {
    User.find({}, (err, users) => {
      res.json(users);
    });
  },
  getInfoUserByUserName: async (req, res) => {
    const userName = req.params.userName;
    const user = await User.findOne({username: userName});
    const countPost = await Post.count({user: user});
    const info = {
      user: user,
      countPost: countPost,
    }
    res.json({
      success: true,
      user: info
    });
  },
  // create a new user
  create: (req, res) => {
    const password = req.body.password;
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        const user = {
          username: req.body.username,
          avatar: 'https://instagram.fixc1-3.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fixc1-3.fna.fbcdn.net&_nc_ohc=VuHrdWdZLhYAX9ny6vK&oh=53db277dd4fb3e3940b83b3664c623e9&oe=5F237E8F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2',
          email: req.body.email,
          password: hash
        };
        User.create(user, (err, user) => {
          if (err) return res.json({ success: false, code: err.code });
          // once user is created, generate a token to "log in":
          const token = signToken(user);
          res.json({
            success: true,
            message: "User created. Token attached.",
            token
          });
        });
      });
    });
  },
  // the login route
  authenticate: (req, res) => {
    // check if the user exists
    User.findOne({ email: req.body.email }, (err, user) => {
      // if there's no user or the password is invalid
      if (!user) {
        // deny access
        return res.json({ success: false, message: "Invalid credentials." });
      }
      const password = req.body.password;
      bcrypt.compare(password, user.password, function(err, result) {
        if (!result) {
          return res.json({ success: false, message: "Wrong password" });
        }
        const token = signToken(user);
        res.json({
          success: true,
          message: "Token attached.",
          token
        });
      });
    });
  }
};
