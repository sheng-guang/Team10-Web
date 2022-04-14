var express = require('express');
var router = express.Router();
var chatModel = require('../models/chat');

const chat = require('../controller/ChatContrl');
const initDB= require('../controller/init');
initDB.init();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Secret Task' });
});

router.get('/detail', function(req, res, next) {
  res.render('detail', { title: 'Secret Task' });
});

router.get('/room', function(req, res, next) {
  let imgID=req.query.img;
  res.render('room', { title: 'My Chat',img:imgID });
});

router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Create story' });
});



module.exports = router;
