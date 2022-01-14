module.exports = app => {
  const authService = require("../controllers/auth.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router
    .post("/register", authService.create)
  
  router
    .post("/login", authService.login)

  // Retrieve all Tutorials
  //router

  // // Retrieve all published Tutorials
  // router.get("/published", tutorials.findAllPublished);

  // // Retrieve a single Tutorial with id
  // router.get("/:id", tutorials.findOne);

  // // Update a Tutorial with id
  // router.put("/:id", tutorials.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", tutorials.delete);

  // // Create a new Tutorial
  // router.delete("/", tutorials.deleteAll);

  // app.use("/api/v1/auth", router);
};
