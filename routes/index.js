var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Secret Task' });
});

router.get('/detail', function(req, res, next) {
  res.render('detail', { title: 'Secret Task' });
});

router.get('/room', function(req, res, next) {
  res.render('room', { title: 'Join your room' });
});

module.exports = router;
