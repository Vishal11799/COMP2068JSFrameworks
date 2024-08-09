var express = require('express');
var router = express.Router();

/* Redirect to login page by default */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});

module.exports = router;
