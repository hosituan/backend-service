const req = require("express/lib/request");
const res = require("express/lib/response");
const db = require("../../models");
const uttils = require("../../service/ultils")

var jwt = require("jsonwebtoken");
const User = db.user;

// Create and Save a new USER
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      success: false,
      message: "username is empty!",
    });
    return;
  }
  if (!req.body.password) {
    res.status(400).send({
      success: false,
      message: "password is empty!",
    });
    return;
  }
  if (!req.body.email) {
    res.status(400).send({
      success: false,
      message: "email is empty!",
    });
    return;
  }

  // Create a User
  const user = new User({
    username: req.body.username,
    password: uttils.getHash(req.body.password),
    email: req.body.email,
  });

  // Save User in the database
  user
    .save(user)
    .then((data) => {
      res.send({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occurred while creating user.",
      });
    });
};

//Login
exports.login = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      success: false,
      message: "username is empty!",
    });
    return;
  }
  if (!req.body.password) {
    res.status(400).send({
      success: false,
      message: "password is empty!",
    });
    return;
  }

  const username = req.body.username;
  const password = req.body.password;

  User.find({
    username: username,
    password: uttils.getHash(password),
  })
    .then((data) => {
      if (!data || data.length == 0)
        res.status(404).send({
          success: false,
          message: "Wrong username or password!",
        });
      else {
        var jwt = require("jsonwebtoken");
        const info = data[0];
        var token = jwt.sign({ info }, "hosituan");
        // save user token
        res.send({
          success: true,
          data: {
            accessToken: token,
          },
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Something went wrong, please try again later!",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Tutorial.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
