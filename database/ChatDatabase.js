/**
 * MongoDB - Chat Database
 *
 * @author  Yanan Zhao
 */
let mongoose = require('mongoose')

mongoose.Promise = global.Promise;
let mongoDB = 'mongodb://localhost:27017/chat';

mongoose.Promise = global.Promise;

connection = mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    checkServerIdentity: false,
})
    .then(() => {
        console.log('connection to mongodb worked!');
    })
    .catch((error) => {
        console.log('connection to mongodb did not work! ' + JSON.stringify(error));
    });
module.exports = mongoose;