var mongoose  = require("mongoose")

module.exports = mongoose.model("ads",mongoose.Schema({
    src:String,
    title:String,
    creat_time:Number,
    user_id:String

}))