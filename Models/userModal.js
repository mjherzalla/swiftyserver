const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let user = new Schema(
  {
    userName: {
      type: String,
    },
    avatarColor: {
      type: String,
    },
  },
  { collection: "OsmosUsers" }
);

module.exports = mongoose.model("OsmosUsers", user);
