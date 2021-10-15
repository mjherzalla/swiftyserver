const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let user = new Schema({
  userName: {
    type: String,
  },
  avatarColor: {
    type: String,
  },
});
let card = new Schema(
  {
    cardID: {
      type: String,
    },
    listID: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
    },
    assignedTo: {
      type: user,
    },
    date: {
      type: String,
    },
    priority: {
      type: String,
    },
  },
  { collection: "OsmosCards" }
);

module.exports = mongoose.model("OsmosCards", card);
