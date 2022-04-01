var chatModel = require('../models/chat');

exports.insert = function (req,res) {
    let userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent')
    }

    try {
        let chat = new chatModel({
            ImageTitle: userData.title,
            Description: userData.description,
            Author: userData.author,
            Basecode: userData.Basecode
        });
        console.log('received: ' + chat);
        //printbase64();
        chat.save(function (err) {
            if (err) {
                res.status(500).send('Invalid data');
            }
            console.log('data send successfully');

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(chat))
        });
    } catch (e) {
        res.status(500).send('error: ' + e);
    }
}
