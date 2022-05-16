/**
 * MongoDB - Chat Controller
 *
 * @author  Yanan Zhao
 */
let ChatModel = require('../models/ChatModel');
exports.insert = function (req, res) {
    let userData = req.body;
    console.log(userData);
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    try{
        let chatModel= new ChatModel({
            Id: userData.Id,
            Date: userData.Date,
            Timestamp: userData.Timestamp,
            ImageTitle: userData.ImageTitle,
            Description: userData.Description,
            Author: userData.Author,
            Picture: userData.Picture
        });
        console.log('received: ' + chatModel.Date);

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
     ChatModel.find().then(x=>{
         res.setHeader('Content-Type', 'application/json');
         res.send(JSON.stringify(x))
    });

}