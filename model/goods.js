var mongoose = require('mongoose')

module.exports = mongoose.model("goods",mongoose.Schema({
    name:String,
    img:String,
    price:String,
    desc:String,
    hot:Boolean,
    cate:String,
    cate_zh:String,
    shop_id:String,
    create_time:Number
}))