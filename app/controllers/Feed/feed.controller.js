const db = require("../../models");
const Post = db.feed;

exports.createPost = (req, res) => {
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
    ownerId: decoded.info.id,
    groupId: req.body.groupId ?? "newfeed",
    isPublic: req.body.isPublic ?? true,
    upvoteCount: 0,
    downvoteCount: 0,
    upvotedUserId: [],
    downvotedUserId: [],
  });

  post
    .save(post)
    .then((data) => {
      res.send({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while creating post.",
      });
    });
};

exports.getPostDetail = (req, res) => {
  const postId = req.body.postId;
  const groupId = req.body.groupId ?? "newfeed";
  Post.findOne({
    _id: postId,
    groupId: groupId,
  })
  .then((data) => {
    if (!data || data.length == 0)
      res.status(404).send({
        success: false,
        message: "Post not found!",
      }) 
    else {
      res.send( {
        success: true,
        data: data
      })
    }})
  .catch((err) => {
    res.status(500).send({
      success: false,
      message: "Error when voting" + postId,
    });
  });
};

exports.getList = (req, res) => {
  // if (!req.body.accessToken) {
  //   res.status(400).send({
  //     success: false,
  //     message: "Unauthentication!",
  //   });
  //   return;
  // }
  var jwt = require("jwt-decode");
  var decoded = jwt(req.body.accessToken);
  const page = req.query.page ?? 1; //todo
  const groupId = req.body.groupId ?? "newfeed";
  const limit = req.query.limit ?? 20;
  const startIndex = page * limit; //todo
  Post.find({
    isPublic: true,
    groupId: groupId,
  })
    .sort({ updatedAt: -1 })
    .limit(limit)
    .then((data) => {
      res.send({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred, please try again later",
      });
    });
};
