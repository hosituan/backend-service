const db = require("../../models");
const Vote = db.feed;

//like
exports.upvote = (req, res) => {
  if (!req.body.accessToken) {
    res.status(400).send({
      success: false,
      message: "Unauthentication!",
    });
    return;
  }
  var jwt = require("jwt-decode");
  var decoded = jwt(req.body.accessToken);
  const postId = req.body.postId;
  const groupId = req.body.groupId ?? "newfeed"
  Vote.findOne({
      _id: postId,
      groupId: groupId
  })
    .then((data) => {
      if (!data || data.length == 0)
        res.status(404).send({
          success: false,
          message: "Post not found!",
        });
      else {
        var upvotedUserId = data.upvotedUserId;
        if (upvotedUserId.includes(decoded.info.id)) {
          res.send({
            success: false,
            message: "Already voted",
            data: data,
          });
        } else {
          var upvoteCount = data.upvoteCount;
          upvoteCount += 1;
          data.upvoteCount = upvoteCount;
          upvotedUserId.push(decoded.info.id); //Append userid
          data.upvotedUserId = upvotedUserId;
          Vote.findByIdAndUpdate(postId, data, { useFindAndModify: false })
            .then((responseData) => {
              if (!responseData) {
                res.status(404).send({
                  success: false,
                  message: "Can't vote post " + postId,
                });
              } else
                res.send({
                  success: true,
                  message: "Voted post " + postId,
                  data: data,
                });
            })
            .catch((err) => {
              res.status(500).send({
                success: false,
                message: "Error when voting" + postId,
              });
            });
        }
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Something went wrong, please try again later!",
      });
    });
};

//Remove Like
exports.removeUpvote = (req, res) => {
  if (!req.body.accessToken) {
    res.status(400).send({
      success: false,
      message: "Unauthentication!",
    });
    return;
  }
  var jwt = require("jwt-decode");
  var decoded = jwt(req.body.accessToken);
  const postId = req.body.postId;
  const groupId = req.body.groupId ?? "newfeed"
  Vote.findOne({
      _id: postId,
      groupId: groupId
  })
    .then((data) => {
      if (!data || data.length == 0)
        res.status(404).send({
          success: false,
          message: "Post not found!",
        });
      else {
        var upvotedUserId = data.upvotedUserId;
        if (!upvotedUserId.includes(decoded.info.id)) {
          res.send({
            success: false,
            message: "Haven't voted yet",
            data: data,
          });
        } else {
          var upvoteCount = data.upvoteCount;
          upvoteCount -= 1;
          data.upvoteCount = upvoteCount;
          const index = upvotedUserId.indexOf(decoded.info.id);
          if (index > -1) {
            upvotedUserId.splice(index, 1);
          } //Remove userId
          data.upvotedUserId = upvotedUserId;
          Vote.findByIdAndUpdate(postId, data, { useFindAndModify: false })
            .then((responseData) => {
              if (!responseData) {
                res.status(404).send({
                  success: false,
                  message: "Can't unvote post " + postId,
                });
              } else
                res.send({
                  success: true,
                  message: "Unvoted post " + postId,
                  data: data,
                });
            })
            .catch((err) => {
              res.status(500).send({
                success: false,
                message: "Error when unvoting" + postId,
              });
            });
        }
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Something went wrong, please try again later!",
      });
    });
};

//Dislike
exports.downvote = (req, res) => {
  if (!req.body.accessToken) {
    res.status(400).send({
      success: false,
      message: "Unauthentication!",
    });
    return;
  }
  var jwt = require("jwt-decode");
  var decoded = jwt(req.body.accessToken);
  const postId = req.body.postId;
  const groupId = req.body.groupId ?? "newfeed"
  Vote.findOne({
      _id: postId,
      groupId: groupId
  })
    .then((data) => {
      if (!data || data.length == 0)
        res.status(404).send({
          success: false,
          message: "Post not found!",
        });
      else {
        var downvotedUserId = data.downvotedUserId;
        if (downvotedUserId.includes(decoded.info.id)) {
          res.send({
            success: false,
            message: "Already downvoted",
            data: data,
          });
        } else {
          var downvoteCount = data.downvoteCount;
          downvoteCount += 1;
          data.downvoteCount = downvoteCount;
          downvotedUserId.push(decoded.info.id); //Append userid
          data.downvotedUserId = downvotedUserId;
          Vote.findByIdAndUpdate(postId, data, { useFindAndModify: false })
            .then((responseData) => {
              if (!responseData) {
                res.status(404).send({
                  success: false,
                  message: "Can't downvote post " + postId,
                });
              } else
                res.send({
                  success: true,
                  message: "Downvoted post " + postId,
                  data: data,
                });
            })
            .catch((err) => {
              res.status(500).send({
                success: false,
                message: "Error when downvoting" + postId,
              });
            });
        }
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Something went wrong, please try again later!",
      });
    });
};

//Remove downvote
exports.removeDownvote = (req, res) => {
  if (!req.body.accessToken) {
    res.status(400).send({
      success: false,
      message: "Unauthentication!",
    });
    return;
  }
  var jwt = require("jwt-decode");
  var decoded = jwt(req.body.accessToken);
  const postId = req.body.postId;
  const groupId = req.body.groupId ?? "newfeed"
  Vote.findOne({
      _id: postId,
      groupId: groupId
  })
    .then((data) => {
      if (!data || data.length == 0)
        res.status(404).send({
          success: false,
          message: "Post not found!",
        });
      else {
        var downvotedUserId = data.downvotedUserId;
        if (!downvotedUserId.includes(decoded.info.id)) {
          res.send({
            success: false,
            message: "Havn't downvoted yet",
            data: data,
          });
        } else {
          var downvoteCount = data.downvoteCount;
          downvoteCount -= 1;
          if (downvoteCount < 0) {
            downvoteCount = 0;
          }
          data.downvoteCount = downvoteCount;
          const index = downvotedUserId.indexOf(decoded.info.id);
          if (index > -1) {
            downvotedUserId.splice(index, 1);
          } //Remove userId
          data.downvotedUserId = downvotedUserId;
          Vote.findByIdAndUpdate(postId, data, { useFindAndModify: false })
            .then((responseData) => {
              if (!responseData) {
                res.status(404).send({
                  success: false,
                  message: "Can't undownvote post " + postId,
                });
              } else
                res.send({
                  success: true,
                  message: "Undownvoted post " + postId,
                  data: data,
                });
            })
            .catch((err) => {
              res.status(500).send({
                success: false,
                message: "Error when downvoting" + postId,
              });
            });
        }
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Something went wrong, please try again later!",
      });
    });
};
