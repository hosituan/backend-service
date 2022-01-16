module.exports = (app) => {
  const postService = require("../controllers/Feed/feed.controller.js");
  const voteService = require("../controllers/Vote/vote.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/create", postService.createPost)
  router.post("/list", postService.getList)
  router.get("/detail", postService.getPostDetail)

  router.post("/upvote", voteService.upvote)
  router.delete("/upvote", voteService.removeUpvote)

  router.post("/downvote", voteService.downvote)
  router.delete("/downvote", voteService.removeDownvote)

  app.use("/api/v1/feed", router);
};
