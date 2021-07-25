const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let jsonFile = new Schema(
  {
    userID: {
      type: String,
    },
    fileID: {
      type: String,
    },
    title: {
      type: String,
    },
    apiUrl: {
      type: String,
    },
    data: {
      type: String,
    },
  },
  { collection: "jsonfiles" }
);

module.exports = mongoose.model("jsonfile", jsonFile);
