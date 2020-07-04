var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("./utils/connect")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodRouter = require('./routes/good');
var cartRouter = require('./routes/cart');
var cateRouter = require('./routes/cate'); 
var uploadRouter = require("./routes/upload");
var articleRouter = require("./routes/article");


var app = express();
//  app.use()  注册并使用中间件
app.use(logger('dev'));
app.use(express.json({limit:"100000kb"}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 图片上传，后端cors运行其访问
app.all("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next()
})

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/good', goodRouter);
app.use('/api/cart', cartRouter);
app.use('/api/cate', cateRouter);
app.use("/upload",uploadRouter)
app.use("/api/article",articleRouter)

module.exports = app;
