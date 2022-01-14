const db = require("../../models");
const Vote = db.vote;

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
  const vote = new Vote({

  })

  vote
  .save(vote)
  .then((data) => {
    res.send({
      success: true,
      data: data
    });
  })
  .catch((err) => {
    res.status(500).send({
      success: false,
      message: err.message || "Some error occurred while voting.",
    });
  });

};
