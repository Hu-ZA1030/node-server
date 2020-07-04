var express = require('express');
var router = express.Router();
var adModel = require("../model/ad")
var jwt = require("../utils/jwt");
const ad = require('../model/ad');

/* 移动端轮播图的接口 */
// 新增
router.post('/createBanner', function(req, res, next) {
    
    // jwt.verifyToken(token).then(user=>{
    //     console.log("user",user)
    // })
    var {title,src} = req.body
    var ele = {
        title,
        src,
        user_id:"liba",
        creat_time:Date.now()
    }
    adModel.insertMany([ele]).then(()=>{
        res.json({err:0,msg:"sueccess"})
    })

});

// 获取轮播图数据
router.get('/list', function(req, res, next) {
    adModel.find({}).then(arr=>{
        res.json({err:0,msg:"success",data:arr})
    })
  });

// 删除轮播图数据
router.get("/del",function(req,res){
    let {id} = req.query
    adModel.deleteOne({_id:id}).then(()=>{
        res.json({err:0,mgs:"删除成功"})
    })
})

module.exports = router;
