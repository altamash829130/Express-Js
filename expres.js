const fs = require("fs");
const path = require("path");
const express = require("express");
const { off } = require("process");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.get("/currenttime", function (req, res) {
  res.send("<h1>" + new Date().toISOString() + "</h1>");
});

app.get("/", function (req, res) {
  res.send(
    "<form action='/store-user' method='POST' autocomplete='off'><label>Your Name</label><input type='text' name='username'><button>Submit</button></form>"
  );
});

app.post("/store-user", function (req, res) {
  const userName = req.body.username;

  const filePath = path.join(__dirname, "data", "users.json");

  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);

  existingUsers.push(userName);

  fs.writeFileSync(filePath, JSON.stringify(existingUsers));
  res.send("<h1>Username Stored! </h1>");
});

app.listen(3000);
