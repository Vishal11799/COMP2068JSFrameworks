var express = require("express");
var router = express.Router();
const User = require("../models/ser");
const passport = require("passport");

/* Redirect to login page by default */
router.get("/", function (req, res, next) {
  res.render("index", { title: "creditapp" });
});

router.get("/home", function (req, res, next) {
  res.render("home", { title: "home" });
});

router.get("/register", function (req, res, next) {
  res.render("register", { title: "create a new account" });
});

router.get("/chart", function (req, res, next) {
  res.render("charts", { title: "chart" });
});

// GET /login
router.get("/login", (req, res, next) => {
  // Obtain session messages if any
  let messages = req.session.messages || [];
  // Clear messages after they are retrieved
  req.session.messages = [];
  // Pass messages to the view
  res.render("login", { title: "Login", messages: messages });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureMessage: "Invalid credentials",
  })
);

// POST /register
router.post("/register", (req, res, next) => {
  const { username, password, confirm } = req.body;

  // Check if password and confirm password match
  if (password !== confirm) {
    console.log("Passwords do not match");
    return res.redirect("/register");
  }

  // Create a new user based on the information from the page
  User.register(new User({ username: username }), password, (err, newUser) => {
    if (err) {
      console.log(err);
      // Redirect back to the register page if there's an error
      return res.redirect("/register");
    }

    // Log the user in and redirect
    req.login(newUser, (err) => {
      if (err) {
        console.log(err);
        return res.redirect("/register");
      }
      res.redirect("/login");
    });
  });
});

module.exports = router;
