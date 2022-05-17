/**
 * Complete the connection and communication with MongoDB
 * acp21zo-Ziyi Ouyang
 */

var express = require('express');
var router = express.Router();


var story={};
story.title='0'
var list=[story];


const chat = require('../controller/ChatController');
const initDB= require('../controller/init');
initDB.init();

router.post('/upload',chat.insert);


router.post('/download', chat.out);


module.exports = router;
