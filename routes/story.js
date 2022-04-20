var express = require('express');
var router = express.Router();
var chatModel = require('../models/chat');

const chat = require('../controller/ChatController');
const initDB= require('../controller/init');
initDB.init();

router.get('/upload', function(req, res, next) {
    var title=req.query.title;
    var description=req.query.description;
    var author=req.query.author;
    //mongo
    res.send();
});

router.get('/download', function(req, res, next){
    res.setHeader('Content-Type','application/json');
    var re0={}
    re0.title="O"
    res.json([re0]);
    }
);
