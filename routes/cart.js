var express = require('express');
var router = express.Router();
var cartModel = require("../model/carts")
var userModel = require("../model/users")
var goodModel = require("../model/goods")
var jwt = require("../utils/jwt");
const { token } = require('morgan');

/* 添加购物车 */
router.get('/addCart', function(req, res){
    // 他是谁？(用户鉴权)   添加购物车
    // 获取商品id
    var {good_id} = req.query
    // 验证必填参数
    console.log(good_id)
    if(!good_id) return res.json({err:"1",msg:"good_id是必填字段"})

    // 判断商品是否存在
    goodModel.find({_id:good_id}).then(arr=>{
        // 获取商品的数组长度大于0，说明由数据
        if(arr.length>0){
            // 判断token 是否传递过来了
            var token  = req.headers.authorization
            if(!token) return res.json({err:-1,msg:"token无效，请重新登入"})

            // 用户鉴权
            jwt.verifyToken(token).then(user=>{
                // 根据用户名来查寻用户信息，因为我们的token被解析成用户名和密码
                userModel.find({user}).then(arr=>{
                    var user_id = arr[0].id
                    // 入库
                    var ele = {
                        good_id,
                        user_id,
                        create_time:Date.now(),
                        order_id:"QF"+ Date.now()
                    }
                    cartModel.insertMany([ele]).then(()=>{
                        res.json({err:0,msg:"添加购物车成功",data:ele})
                    })
                })
            
            }).catch(()=>{res.json({err:-1,msg:"token无效，请重新登入"}) })
        
        }
    }).catch(()=>{res.json({err:0,msg:"当前商品不存在，无法购买"}) })

})


//获取购物车列表
router.get("/getCartList",function(req,res){
    let {page,size} = req.query

    // page和size 若没有传到后端就给默认值
    page = parseInt(page || 1)
    size = parseInt(size ||  1000)
    
    // 获取token 
    var token = req.headers.authorization
    jwt.verifyToken(token).then(user=>{
        console.log("user",user);
        
    }) 

})

module.exports = router;
