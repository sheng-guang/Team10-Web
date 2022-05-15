let mongoose = require('../database/ChatDatabase');

const mongoose = require('../database/ChatDatabase');


let Schema = mongoose.Schema;

let ChatSchema = new Schema(
    {
        ImageTitle:{type: String},
        Description:{type: String},
        Author: {type:String},

    }
);


module.exports = mongoose.model('Chat',ChatSchema,'chat');

