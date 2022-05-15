let ChatModel = require('../models/ChatModel');

exports.insert = function (req, res) {
    let userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }


    let chatModel = new ChatModel({
        ImageTitle: userData.title,
        Description: userData.description,
        Author: userData.author,
    });
    console.log('received: ' + chatModel);

    chatModel.save()
        .then((results) => {
            console.log(results._id);
            res.json(chatModel);
        })
        .catch((error) => {
            res.status(500).json('Data is not correct' + JSON.stringify(error));
        })
}