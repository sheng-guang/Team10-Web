/**
 * MongoDB - Chat Model
 *
 * @author  Yanan Zhao
 */
let mongoose = require('../database/ChatDatabase');
let Schema = mongoose.Schema;

let ChatSchema = new Schema(
    {
        Id:{type:Number},
        Date: {type:String},
        Timestamp:{type:String},
        ImageTitle:{type: String},
        Description:{type: String},
        Author: {type:String},
        Picture: {type:String}
    }
);

module.exports = mongoose.model('Chat',ChatSchema,'chat');

