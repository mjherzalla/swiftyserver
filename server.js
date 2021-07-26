const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const jsonFile = require("./model");
const router = express.Router();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const uri =
  "mongodb+srv://milagro:moon2006@cluster0.vcm9w.mongodb.net/jsonhost?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

app.use("/", router);

router.route("/CreateNew").get(function (req, res) {
  console.log(req.query.data);
  const Jdata = JSON.parse(req.query.data);
  console.log(Jdata);
  var data = {
    userID: Jdata[0].userID || "UserID",
    fileID: Jdata[0].fileID || "filedi",
    title: Jdata[0].title || "filedi",
    apiUrl: Jdata[0].apiUrl || "filedi",
    data: JSON.stringify(Jdata[0].data) || "filedi",
  };

  const newj = new jsonFile(data);

  newj.save(function (err) {
    if (err) return console.log(err);
    // saved!
  });
});

router.route("/getFile").get(function (req, res) {
  // find all athletes that play tennis
  var query = jsonFile.find({ fileID: req.query.fileID });

  query.exec(function (err, file) {
    if (file.length == 0) {
      res.send("file notfound");
    } else {
      res.send(file);
    }

    if (err) return handleError(err);
    // athletes contains an ordered list of 5 athletes who play Tennis
  });
});

router.route("/deleteFile").get(function (req, res) {
  jsonFile.deleteOne({ fileID: req.query.fileID }, function (err) {
    if (!err) {
      console.log(req.query.fileID + " was delete");
      res.send("file was delete");
    } else {
      console.log(err);
    }
  });
});

router.route("/getFilesList").get(function (req, res) {
  // find all athletes that play tennis
  var query = jsonFile.find({ userID: req.query.userID });

  query.exec(function (err, file) {
    if (file.length == 0) {
      res.send("file notfound");
    } else {
      res.send(file);
    }

    if (err) return handleError(err);
    // athletes contains an ordered list of 5 athletes who play Tennis
  });
});
router.route("/UpdateFile").get(function (req, res) {
  var query = { fileID: req.query.fileID };
  console.log("sss");

  jsonFile.findOneAndUpdate(
    query,
    { data: req.query.Data },
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Succesfully saved.");
    }
  );
});

app.get("*", function (req, res) {
  var query = jsonFile.find({ fileID: req.path.replace("/", "") });
  query.exec(function (err, file) {
    if (file.length == 0) {
      res.send("file not found");
    } else {
      res.send(JSON.parse(file[0].data));
    }
    if (err) return handleError(err);
  });
});

app.listen(process.env.PORT || 3001, function () {});
