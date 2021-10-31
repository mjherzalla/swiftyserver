const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

const boardModel = require("./Models/boardModel");
const cardModel = require("./Models/cardModel");
const listModel = require("./Models/listModel");
const userModel = require("./Models/userModal");

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
  "mongodb+srv://milagro:moon2006@cluster0.vcm9w.mongodb.net/osmos?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

app.use("/", router);

router.route("/createNewboard").get(function (req, res) {
  var data = {
    boardID: "1",
    boardTitle: "boardTitle",
    pojectIconUrl: "pojectIconUrl",
  };

  const newboard = new boardModel(data);

  newboard.save(function (err) {
    if (err) return console.log(err);
    // saved!
    res.send("New board created succesfully");
  });
});

router.route("/createNewList").get(function (req, res) {
  var data = {
    listID: req.query.listID || "",
    listTitle: req.query.listTitle || "title",
    listStatus: req.query.listStatus || "On",
  };
  const newList = new listModel(data);

  newList.save(function (err) {
    if (err) return console.log(err);
    // saved!
    res.send("New list created Succesfully");
  });
});

router.route("/createNewCard").get(function (req, res) {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();

  var data = {
    cardID: Math.random().toString(36).substr(2, 9),
    listID: req.query.listID,
    title: req.query.title,
    description: "description",
    status: "status",
    assignedTo: { userName: "none", avatarColor: "" },
    date: month + "/" + day,
    priority: req.query.priority,
  };
  const newCard = new cardModel(data);

  newCard.save(function (err) {
    if (err) return console.log(err);
    // saved!
    res.send("New card created Succesfully");
  });
});
router.route("/getLists").get(function (req, res) {
  listModel.find({}, function (err, lists) {
    if (err) return handleError(err);
    res.send(lists);
  });
});

router.route("/getCards").get(function (req, res) {
  cardModel.find({}, function (err, lists) {
    if (err) return handleError(err);
    res.send(lists);
  });
});

router.route("/getBoards").get(function (req, res) {
  boardModel.find({}, function (err, lists) {
    if (err) return handleError(err);
    res.send(lists);
  });
});
router.route("/getUsers").get(function (req, res) {
  userModel.find({}, function (err, lists) {
    if (err) return handleError(err);
    res.send(lists);
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

router.route("/updateboard").get(function (req, res) {
  var query = { fileID: req.query.fileID };

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
router.route("/updateCardListID").get(function (req, res) {
  var query = { cardID: req.query.cardID };

  cardModel.findOneAndUpdate(
    query,
    { listID: req.query.listID },
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Succesfully saved.");
    }
  );
});
router.route("/assginUsertoCard").get(function (req, res) {
  var query = { cardID: req.query.cardID };

  cardModel.findOneAndUpdate(
    query,
    {
      assignedTo: {
        userName: req.query.userName,
        avatarColor: "#" + req.query.avatarColor,
      },
    },
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Succesfully saved.");
    }
  );
});

router.route("/updateListTitle").get(function (req, res) {
  var query = { listID: req.query.listID };

  listModel.findOneAndUpdate(
    query,
    { listTitle: req.query.listTitle },
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Succesfully saved.");
    }
  );
});

router.route("/updateCard").get(function (req, res) {
  var query = { cardID: req.query.cardID };

  cardModel.findOneAndUpdate(
    query,
    { description: req.query.description },
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Succesfully saved.");
    }
  );
});

router.route("/addUserToBorad").get(function (req, res) {
  var query = { boradID: req.query.boardID };

  var data = {
    userName: req.query.userName,
    avatarColor: "#" + req.query.avatarColor,
  };

  const newUser = new userModel(data);

  newUser.save(function (err) {
    if (err) return console.log(err);
    // saved!
    res.send("New user created succesfully");
  });
});

app.listen(process.env.PORT || 3001, function () {});
