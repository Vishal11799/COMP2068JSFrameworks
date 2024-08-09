var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

/* POST expense data. */
router.post('/add-expense', function(req, res, next) {
  const { category, amount } = req.body;

  // Logic to save the expense to the database
  // Example: Save expense details to MongoDB

  res.redirect('/home');
});

module.exports = router;
