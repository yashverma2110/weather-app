const path = require("path");
const favicon = require("serve-favicon");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");

const app = express();

const publicPath = path.join(__dirname, "../public/");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs"); // to tell express which template we are using
app.set("views", viewPath); // to set up default views location
hbs.registerPartials(partialsPath); // to set up location for reusable components
app.use(express.static(publicPath));
app.use(favicon(path.join(__dirname, "../public/assets/location.ico")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Yash Verma",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.json({
      error: "Please provide a address!",
    });
  }
  geocode(req.query.address, (forecast) => {
    res.json({
      forecast,
      location: req.query.address,
    });
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Yash Verma",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Yash Verma",
  });
});

app.get("/*", (req, res) => {
  res.render("404");
});

app.listen(3000, () => console.log("Server is up on port 3000"));
