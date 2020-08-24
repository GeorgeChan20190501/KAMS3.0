
const UserService = require('../service/UserService')
const UserTokenGenerate = require('./UserTokenGenerate')

exports.check = function (reqParam){
    return new Promise(async (resolve,reject)=>{
        var token = reqParam.token
        if(!token){
            reject(405)
        }
        var data= await UserService.getUserById(reqParam)

        var result= await UserTokenGenerate.checkToken(token).catch(e=>{
            reject(404)
            return  
        })
           
        console.log('result'+result)
        if(data==null || data.token!=token){
            reject(404)
            return  
        }
        resolve(200)
    })
}
