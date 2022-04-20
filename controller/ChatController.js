let ChatModel = require('../models/chat');

exports.insert = function (req, res) {
    let userData = req.body;
    if (userData == null) {
        res.status(403).send('No data sent!')
    }

    let chatModel= new ChatModel({
        first_name: userData.firstname,
        family_name: userData.lastname,
        dob: userData.year
    });
    console.log('received: ' + chatModel);

    character.save()
        .then ((results) => {
            console.log(results._id);
            res.json(character);
        })
        .catch ((error) => {
            res.status(500).json('Could not insert - probably incorrect data! ' + JSON.stringify(error));
        })

}
