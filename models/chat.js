let mongoose = require('../database/db-connect');

let Schema = mongoose.Schema;

let ChatSchema = new Schema(
    {
        ImageTitle:{type: String, max:20},//required true
        Description:{type: String, max:100},//required true
        Author: {type:String},
        BaseCode:{type:String}
    }
);

let chatModel = mongoose.model('Chat',ChatSchema,'chat');

module.exports = chatModel;