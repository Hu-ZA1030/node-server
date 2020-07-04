var mongoose = require('mongoose')


module.exports = mongoose.model("articles ",mongoose.Schema({
    title:String,
    content:String,
    author:String,
    create_time:Number
}))
