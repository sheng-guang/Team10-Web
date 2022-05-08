var express = require('express');
var router = express.Router();
// var chatModel = require('../models/chat');

var story={};
story.title='0'
var list=[story];


const chat = require('../controller/ChatController');
const initDB= require('../controller/init');
initDB.init();

router.post('/upload', function(req, res, next) {
    var title=req.query.title;
    var description=req.query.description;
    var author=req.query.author;
    var newstory={};
    newstory.title=title;
    newstory.description=description;
    newstory.author=author;
    list.push(newstory);
console.log("on server  get"+newstory);

    //mongo
    res.send();
});

router.get('/download', function(req, res, next){
    res.setHeader('Content-Type','application/json');

    res.json(list);
    }
);
module.exports = router;
