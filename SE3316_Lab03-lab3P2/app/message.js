// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MessageSchema   = new Schema({
    timeStamp: String,
    courseID: String,
    messageBody: String,
    count: String
    
});

module.exports = mongoose.model('Message', MessageSchema);