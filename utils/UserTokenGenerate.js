const jwt = require('jsonwebtoken')
const secret = "KAMS";


exports.createToken = function (user){ 
    var payload={
        iss : 'KAMS3.0' ,        //签发者
        iat : new Date().getTime() ,       //签发时间
        exp : new Date(new Date().setDate(new Date().getDate()+7)).getTime(),    //过期时间
        sub : 'KMS3.0 users',    //面向的用户
        aud : user.account       //接收方 
    }
    console.log('iat'+payload.iat)
    console.log('exp'+payload.exp)
        return jwt.sign(payload,secret);
    }
    
exports.checkToken = function (token){
    return new Promise((resolve,reject)=>{
        jwt.verify(token,secret,(err,res)=>{
            if(!err) {
                console.log('验证token通过')
                resolve(true)
            }else{
                console.log('验证token失败')
                reject(false);
            }
        })
    })
    
} 



 

 