// load up the express framework and body-parser helper
const express = require("express");

const faunadb = require("faunadb"),
  q = faunadb.query;
var client = new faunadb.Client({
  secret: "fnAEO1slFfAASHNYzXPX6C62o6xAz3EBpbLXJWrz",
});
let interactioncount = 0;
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/createFile", function (req, res) {
  client
    .query(q.CreateCollection({ name: "Posts" }))
    .then((ret) => console.log(ret))
    .catch((err) => console.error("Error: %s", err));
});

//-------------------------------------------------------------------------------------------------------------------------------------
app.post("/CreateNewTeamCollection", function (req, res) {
  interactioncount++;
  const MasterUser_id = req.query.MasterUser_id;
  const ProjectName = req.query.ProjectName;
  const Token = token();
  const CollectionName = ProjectName + "_" + Token;

  client
    .query(q.CreateCollection({ name: CollectionName }))
    .then((ret) => res.send(ProjectName + "_" + Token))
    .catch((err) => console.error("Error: %s", err));
});

app.post("/CreateNewTeamCollectionDataInterface", function (req, res) {
  interactioncount++;
  const CollectionName = req.query.CollectionName;
  const Interface = JSON.parse(req.query.Interface);

  client
    .query(
      q.Insert(q.Ref(q.Collection(CollectionName), "0"), 2, "create", {
        data: {
          Interface,
        },
      })
    )
    .then((ret) => res.send("scusses"))
    .catch((err) => console.error("Error: %s", err));
});

app.post("/Insertintojson", function (req, res) {
  interactioncount++;

  const jsonName = req.query.jsonName;
  const Data = req.query.Data;
  const id = Math.floor(getNewID());

  client
    .query(
      q.Insert(q.Ref(q.Collection(jsonName), id), id, "create", {
        data: JSON.parse(Data),
      })
    )
    .then((ret) => res.send("scusses"))
    .catch((err) => res.send("fromserver" + err.message));
});

app.get("/getjson", function (req, res) {
  const CollectionName = req.query.CollectionName;
  client
    .query(
      q.Map(
        q.Paginate(q.Documents(q.Collection(CollectionName))),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    )
    .then((ret) => {
      CleanJson(ret.data)
        .then(function (result) {
          res.send(result); // "initResolve"
        })
        .then(function (result) {
          //  res.send(result); // "normalReturn"
        })
        .catch((e) => console.log(e.message));
    })
    .catch((err) => console.error("Error: %s", err));
});

app.post("/editjson", function (req, res) {
  const jsonName = req.query.jsonName;
  const id = req.query.id;
  const data = JSON.parse(req.query.change);

  console.log(data.data);
  client
    .query(
      q.Update(q.Ref(q.Collection(jsonName), id), {
        data: data,
      })
    )
    .then((ret) => res.send("scusses"))
    .catch((err) => console.error("Error: %s", err));
});

const CleanJson = (temparry) => {
  const temp = [];
  return new Promise(async (resolve, reject) => {
    const result = await temparry.map((x) => {
      temp.push(x.data.data);
    });
    resolve(temp);
  });
};

app.get("/", function (req, res) {
  res.send(
    "<h3>Server Ready</h3>" + "<p>Sigma Count" + interactioncount + "</p>"
  );
});

function getNewID() {
  return Math.random() * (9999999999 - 1000000000) + 1000000000;
}

var token = function () {
  var rand = Math.random().toString(36).substr(2);
  return rand;
};
// finally, launch our server on port 3001.
const server = app.listen(3001, () => {
  console.log("listening on port %s...", server.address().port);
});
