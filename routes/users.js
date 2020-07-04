var express = require('express');
var router = express.Router();
var userModel = require("../model/users") 
var md5 = require('md5');
var jwt = require("../utils/jwt")

/* 用户注册. */
router.post('/regist', function(req, res) {

  // req.body() post请求接收数据
  // req.query() get 接收请求数据
  // console.log(req.body)
  // var username = req.body.username
  // var password = req.body.password
  var {username,password,role} = req.body

  // 必填与非必填
  if(!username || !password) return res.json({err:1,msg:"缺失必填参数"})
 
  // 数据类型及数据格式（需求）
  // 正则验证用户名
  if(!/[a-zA-Z]{3,16}/.test(username)){
    return res.json({err:2,msg:"用户名要求是3-16位纯字母组成"})
  }
  // 正则验证密码
  if(!/^[a-zA-Z][a-zA-Z0-9\@\_\-\$]{5,17}$/.test(password)){
     return res.json({err:2,msg:"密码不符合要求，首字母是字母，6~18位密码"})
  }

  // 业务需求验证
  userModel.find({username}).then((arr)=>{
    if(arr && arr.length>0){
      res.json({err:3,msg:"用户名已注册"})
    }else{
      // 入库
      var ele = {
          username,
          password:md5(password),
          role:role? role : 1,
          creat_time:Date.now()
      }
      userModel.insertMany([ele]).then(()=>{
        res.json({err:0,msg:"注册成功",data:{username}})
      })
    }
  })

  // 成功then   失败catch()  最后 finally()
  // userModel.insertMany([]).then().catch()
  // userModel.insertMany([]).then(()=>{
  //   res.json({err:0,msg:"注册成功",data:{}})
  // })
  
});



// 用户登入
router.post("/login",function(req,res){

  // 获取前端传递过来的参数
  // var {username,password} = req.body
  var username = req.body.username
  var password1 = md5(req.body.password)


  // 必填与非必填
  if(!username) return res.json({err:1,msg:"缺失用户名"})
  if(!password1) return res.json({err:1,msg:"缺失密码"})

  // 查询集合，如果存在这条记录就登入成功
  userModel.find({username}).then(arr=>{
    // console.log(arr[0].password);
    if(arr && arr.length>0){
      if(arr[0].password == password1){
          // 其他集合查询
        res.json({err:0,msg:"success",data:{
          nav:[],
          role:1,
          username,
          avatar:"",
          token:jwt.createToken({username,password1})
        }})
      }else{
        res.json({err:1,msg:"用户名或密码不匹配"})
      }
    
    }else{
      res.json({err:1,msg:"登入失败"})
    }

  })

  
})




module.exports = router;


/*
后端接收项目首先做的事情：
  必填与非必填
  数据类型及数据格式（需求）
  业务需求验证

*/