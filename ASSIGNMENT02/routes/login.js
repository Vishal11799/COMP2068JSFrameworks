var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* Redirect root to login page */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});

module.exports = router;
