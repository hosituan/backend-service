const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./Auth/user.model.js")(mongoose);
db.feed = require("./Feed/feed.model.js")(mongoose);
module.exports = db;
