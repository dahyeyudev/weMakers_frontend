require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
app.get("/ping", function(req, res) {
  res.send("pong");
});
app.use("/", express.static(path.join(__dirname, "build")));
app.get("/*", function(req, res) {
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Date: new Date()
  });
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("success!");
});
