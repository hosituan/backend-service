const db = require("../../models");
const Post = db.post;

exports.post = (req, res) => {
  if (!req.body.accessToken) {
    res.status(400).send({
      success: false,
      message: "Unauthentication!",
    });
    return;
  }
  // Validate request
  if (!req.body.content) {
    res.status(400).send({
      success: false,
      message: "Content is blank!",
    });
    return;
  }
  var jwt = require("jwt-decode");
  var decoded = jwt(req.body.accessToken);
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    ownerId: decoded._id,
    groupId: req.body.groupId
  });

  post
  .save(post)
  .then((data) => {
    res.send({
      success: true,
      data: data
    });
  })
  .catch((err) => {
    res.status(500).send({
      success: false,
      message: err.message || "Some error occurred while creating post.",
    });
  });

};
