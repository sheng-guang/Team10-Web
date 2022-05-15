let mongoose = require('../database/ChatDatabase');

const mongoose = require('../database/ChatDatabase');


let Schema = mongoose.Schema;

let ChatSchema = new Schema(
    {
        ImageTitle:{type: String, max:20},//required true
        Description:{type: String, max:100},//required true
        Author: {type:String},
        Index:{type:String}
    }
);


module.exports = mongoose.model('Chat',ChatSchema,'chat');

