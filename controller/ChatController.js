let ChatModel = require('../models/ChatModel');

exports.insert = function (req, res) {
    let userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }

    try{
        let chatModel= new ChatModel({
            ImageTitle: userData.title,
            Description: userData.description,
            Author: userData.author,
            //Basecode: userData.Basecode
        });
        console.log('received: ' + chatModel);

        chatModel.save(function (err) {
            if (err) {
                res.status(500).send('Invalid data');
            }
            console.log('Data send successfully');

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(chat))
        });
    } catch (e) {
        res.status(500).send('Error: ' + e);
    }
}
