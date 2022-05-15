var express = require('express');
var router = express.Router();
// var chatModel = require('../models/chat');

var story={};
story.title='0'
var list=[story];


const chat = require('../controller/ChatController');
const initDB= require('../controller/init');
initDB.init();

router.post('/upload',chat.insert,function (req,res,next){

});


router.post('/download', function(req, res, next){
    res.setHeader('Content-Type','application/json');

    res.json(chat.out);
    }
);


module.exports = router;
