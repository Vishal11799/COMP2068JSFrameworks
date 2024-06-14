var express = require('express');
var router = express.Router();

// Home page route
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

// About page route
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Me' });
});

// Projects page route
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects' });
});

// Contact page route
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Me' });
});

module.exports = router;
