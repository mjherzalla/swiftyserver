const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let board = new Schema(
  {
    boardID: {
      type: String,
    },
    boardTitle: {
      type: String,
    },

    boardIconUrl: {
      type: String,
    },
  },
  { collection: "OsmosBoards" }
);

module.exports = mongoose.model("OsmosBoards", board);
