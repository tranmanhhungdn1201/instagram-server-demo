const Notification = require("../models/notification.model");

module.exports = {
  // list all likes post
  index: (req, res) => {
    const userId = req.params.id;
    Notification.find({ userId: userId })
      .populate("user")
      .exec((err, notifications) => {
        if (err) return res.json({ success: false, code: err.code });
        res.json({
          notifications: notifications,
          success: true
        });
      });
  },
  create: (req, res) => {
    const userIdReceive = req.body.userId;
    const content = req.body.content;
    const notification = {
      user: req.currentUser._id,
      userId: userIdReceive,
      content: content
    };
    Notification.create(notification, (err, notification) => {
      if (err) return res.json({ success: false, code: err.code });
      res.json({
        notification: notification.populate("user"),
        success: true
      });
    });
  }
};
