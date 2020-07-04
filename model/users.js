var mongoose = require("mongoose")

// 每一个model就是操作一个集合
// 集合的名字都是复数
module.exports = mongoose.model("users",mongoose.Schema({
    username:String,
    password:String,
    role:Number,
    phone:String,
    email:String,
    create_time:Number
}))