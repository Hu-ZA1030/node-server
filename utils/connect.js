var mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/shopping",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

var db = mongoose.connection
db.on("error",function(err){
  console.log("数据库连接失败",err);
})
db.on("open",function(){
  console.log("数据库连接成功");
  
})