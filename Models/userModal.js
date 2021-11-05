const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let user = new Schema(
  {
    userID: {
      type: String,
    },
    userName: {
      type: String,
    },
    avatarColor: {
      type: String,
    },
  },
  { collection: "swiftyUsers" }
);

module.exports = mongoose.model("swiftyUsers", user);
