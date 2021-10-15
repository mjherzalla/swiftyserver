const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let list = new Schema(
  {
    listID: {
      type: String,
    },
    boardID: {
      type: String,
    },
    listTitle: {
      type: String,
    },
    listStatus: {
      type: String,
    },
  },
  { collection: "OsmosLists" }
);

module.exports = mongoose.model("OsmosLists", list);
