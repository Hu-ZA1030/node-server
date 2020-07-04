var mongoose = require('mongoose')


module.exports = mongoose.model("cates",mongoose.Schema({
    rank:Number,
    cate:String,
    cates_zh:String
}))