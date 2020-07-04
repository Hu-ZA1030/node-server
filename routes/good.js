var express = require('express');
var router = express.Router();
var goodModel = require("../model/goods");
// const { delete } = require('../app');
// const users = require('../model/users');


//添加  更新其实和添加的接口一样，以你由没有id为标准
router.post('/add', function(req, res) {

  let {name,img,price,desc,hot,cate,id} = req.body
  
  // 非必填
  var good ={
    hot:(hot ? hot:false),
    name,
    img,
    price,
    desc,
    cate,
    create_time:Date.now(),
  }
  console.log("id",id)
    if(id){
      goodModel.updateOne({_id:id},good).then(()=>{
        res.json({err:0,msg:"修改成功"})
      })
    }else{
      goodModel.insertMany([good]).then(()=>{
        res.json({err:0,msg:"添加成功"})
      })
    }
  
})

// 删除
router.get("/del",function(req,res){
  var {id} = req.query
  goodModel.deleteOne({_id:id}).then(()=>{
    res.json({err:0,msg:"删除成功"})
  })
})


// 查询
router.get("/list",function(req,res){
  // 前端传过来的参数
  var {page,size,name,hot,cate,max_price,min_price,brand,shop_id} = req.query

  // 非必填数据的处理
  hot = hot || false;
  page = parseInt(page||1)
  size = parseInt(size||10)
  cate = cate || ''

  var params = {
    cate,
    hot,
  }
  if(!params.hot) delete params.hot
  if(!params.cate) delete params.cate
  goodModel.count().then(total=>{
    goodModel.find(params).skip((page-1)*size).limit(size).then(arr=>{
      res.json({err:0,msg:"success",data:{
        total:total,
        list:arr
      }})
    })
  })
})


// 查询商品详情
router.get("/getGoodDetail",function(req,res){
    var {good_id} = req.query
    if(!good_id) return res.json({err:1,msg:"商品id是必填参数"})
    goodModel.find({_id:good_id}).then(arr=>{
      console.log("arr",arr)
      res.json({err:0,msg:"success",data:arr[0]})
    })
})


module.exports = router;
