const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// For storing github profile data
let githubProfileData = {};
// For storing github repo data
let githubRepo = {};

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  const url = req.body.username;
  const userName = "https://api.github.com/users/" + url;
  const repoUrl = "https://api.github.com/users/" + url + "/starred";

  axios
    .get(userName)
    .then((response) => {
      githubProfileData = response.data;
    })
    .then(() => {
      axios.get(repoUrl).then((e) => {
        githubRepo = e.data;
        res.render("resume", {
          profile: githubProfileData,
          starred: githubRepo,
        });
      });
    });
});

app.listen(3000, () => {
  console.log("Server running at 3000");
});
