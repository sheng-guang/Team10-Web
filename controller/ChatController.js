/**
 * MongoDB - Chat Controller
 *
 * @author  Yanan Zhao
 */
let ChatModel = require('../models/ChatModel');
exports.insert = function (req, res) {
    let userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    try{
        let chatModel= new ChatModel({
            Id: userData.id,
            Date: userData.date,
            Timestamp: userData.timestamp,
            ImageTitle: userData.title,
            Description: userData.description,
            Author: userData.author,
            Picture: userData.picture
        });
        console.log('received: ' + chatModel);

        chatModel.save(function (err) {
            if (err) {
                res.status(500).send('Invalid data');
            }
            console.log('Data send successfully');
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(chatModel))
        });
    } catch (e) {
        res.status(500).send('Error: ' + e);
    }
}
exports.out =function (req,res){
    let output=ChatModel.find();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(output))
}