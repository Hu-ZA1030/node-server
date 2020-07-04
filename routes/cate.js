var express = require('express');
var router = express.Router();
var cateModel = require("../model/cates")

/* 商品品类 */
router.get('/getAllCates', function(req, res) {
    cateModel.find({}).sort({rank:1}).then(arr=>{
        res.json({err:0,msg:"商品品类",data:arr})
    })
});

// 基于品类筛选
router.get('/getCateGoodList', function(req, res, next) {
    let { cate, page, size } = req.query
  
    cate = cate || ''
    page = parseInt(page||1)
    size = parseInt(size||1000)
  
    let params = {cate}
    if (!cate) delete params.cate
  
    goodModel.find(params).limit(size).skip((page-1)*size).sort({rank: -1}).then(arr=>{
      res.json({err:0,msg:'success',data:arr})
    }).catch(err=>{
      res.json({err:1,msg:'fail',err})
    })
  })

module.exports = router;
