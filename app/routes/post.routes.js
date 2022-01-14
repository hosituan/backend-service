module.exports = app => {
    const postService = require("../controllers/Feed/post.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router
      .post("/post", postService.post)

    app.use("/api/v1/feed", router);
  };
  