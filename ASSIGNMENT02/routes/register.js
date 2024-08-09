var express = require('express');
var router = express.Router();

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Sign Up' });
});

/* POST register data. */
router.post('/', function(req, res, next) {
  const { username, email, password } = req.body;

  // Example logic for handling registration:
  // - Validate the input
  // - Save the user to the database
  // - Hash the password, etc.

  res.redirect('/login'); // Redirect to login page after registration
});

module.exports = router;
