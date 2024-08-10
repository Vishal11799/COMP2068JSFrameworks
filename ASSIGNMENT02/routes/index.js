var express = require("express");
var router = express.Router();

/* Redirect to login page by default */
router.get("/", function (req, res, next) {
  res.render("index",{ title:'creditapp'});
});

router.get("/home", function (req, res, next) {
  res.render("home",{ title:'home'});
});

router.get("/login", function (req, res, next) {
  res.render("login",{ title:'login'});
});

router.get("/register", function (req, res, next) {
  res.render("register",{ title:'register'});
});

router.get("/chart", function (req, res, next) {
  res.render("charts",{ title:'chart'});
});


module.exports = router;
