/**
 * Nodejs
 * Implement communication between servers
 * acp21zo-Ziyi ouayng
 */

var express = require('express');
var router = express.Router();


const initDB= require('../controller/init');
initDB.init();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Secret Task' });
});

router.get('/detail', function(req, res, next) {
  res.render('detail', { title: 'Task details' });
});

router.get('/room', function(req, res, next) {
  let imgID=req.query.img;
  res.render('room', { title: 'My room',img:imgID });
});

router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Create story' });
});






module.exports = router;
