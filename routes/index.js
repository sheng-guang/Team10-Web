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
  res.render('room', { title: 'Join your room' });
});



router.get('/room', function(req, res, next) {


  chatModel.find({}, function (err,doc){
    if(err){
      console.log(err);
      return;
    }

    res.render('room', {
      title: 'Image Browsing',
      testData: doc
    });
  });
});
module.exports = router;
