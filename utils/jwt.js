var jwt = require("jsonwebtoken")

//封装创建token的方法
// token 由三部分组成 HEADER  PAYLOAD 
function createToken(data){
  return  jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60*24), //保存时间
            data: data //要加密的数据
          }, 'HEADER'); //随意添加的值，混合在密文
}

// console.log(createToken({username:"abc",password:"123"}));

// 封装解密的方法 验证token
function verifyToken(token){
 return new Promise(function(resole,reject){
      try{
        var decoded = jwt.verify(token, 'HEADER');
        console.log("token",decoded)
        resole(decoded.data)
      }catch(err){
        reject(err)
      }
  })
}



module.exports = {
    createToken,
    verifyToken
}