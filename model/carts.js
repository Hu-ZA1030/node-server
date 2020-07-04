var mongoose = require('mongoose')


module.exports = mongoose.model("carts",mongoose.Schema({
    create_time:Number,
    order_id:String,
    // 集合联动,要good集合的域
    good_id:String,
    user_id:String,
}))