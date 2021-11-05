const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let board = new Schema(
  {
    templetID: {
      type: String,
    },
    title: {
      type: String,
    },
    plateform: {
      type: String,
    },
    code: {
      type: String,
    },
    tags: {
      type: String,
    },
    date: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    usedCount: {
      type: Number,
    },
  },
  { collection: "swiftyTemplets" }
);

module.exports = mongoose.model("swiftyTemplets", board);
