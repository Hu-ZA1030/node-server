var express = require('express');
var router = express.Router();
var articleModel = require("../model/article");
var jwt = require("../utils/jwt");

// 文章
router.post("/create", function (req, res) {
    // 前端传递过来的参数
    var { title, content } = req.body
    // 获取token，然后解析成用户名，将用户名赋值给author
    var token = req.headers.authorization
    if (!token) return res, json({ err: -1, msg: "token无效，请重新登入" })
    // // 通过 token 解析成明文，获取用户名
    jwt.verifyToken(token).then(user=>{
        // console.log(user.username)
        var article = {
            title,
            content,
            author: user.username,
            create_time: Date.now(),
        }
        articleModel.insertMany([article]).then(() => {
            res.json({ err: 0, msg: "success" })
        })
    })
        
    
})


module.exports = router;
