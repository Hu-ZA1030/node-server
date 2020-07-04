var mongoose = require('mongoose')


module.exports = mongoose.model("editors",mongoose.Schema({
    title:String,
    content:String,
    author:String
}))