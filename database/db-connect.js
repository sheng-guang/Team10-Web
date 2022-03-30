let mongoose = require('mongoose')

mongoose.Promise = global.Promise;
let mongoDB = 'mongodb://localhost:27017/chat';

mongoose.Promise = global.Promise;
try {
    connection = mongoose.connect(mongoDB,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        checkServerIdentity: false,
    });

    console.log('connection to mongodb worked!');//show the connection message

}catch (e) {
    console.log('db connection has error: '+ e.message);
}
module.exports=mongoose;