const express = require('express')
const bodyParser = require('body-parser')
const userController = express.Router()
const UserService = require('../service/UserService')
const UserTokenGenerate = require('../utils/UserTokenGenerate')
const DateTimeUtils = require('../utils/DateTimeUtils')
userController.use(bodyParser.urlencoded({ extended: true }))
userController.use(bodyParser.json())

userController.get('/', function(req, res) {
    res.send('hello world')
})

userController.post('/login', async function(req, res) {
    var reqParam = req.body
    var account = reqParam.account
    var password = reqParam.password

    if (!account || !password) {
        res.json({
            err_code: 405,
            message: '参数不合法',
            data: null
        })
    }
    var ret = await UserService.checkUser(reqParam)
    if (ret instanceof Error) {
        res.json({
            err_code: 500,
            message: '服务器忙，稍后再试',
            token: null
        })
    }
    if (!ret) {
        res.json({
            err_code: 404,
            message: '用户名或密码错误',
            token: null
        })
        return
    }
    //验证成功，创建Token，并入库
    token = UserTokenGenerate.createToken(reqParam)
    reqParam.token = token

    var tokenRet = await UserService.updateUserToken(reqParam)
    if (tokenRet instanceof Error) {
        res.json({
            err_code: 500,
            message: '服务器忙，稍后再试',
            token: null
        })
    }
    console.log('返回更新tokne值' + tokenRet)
    if (tokenRet === 1) {
        res.json({
            err_code: 200,
            message: '用户登录成功',
            token: token
        })
    }
})

userController.post('/addUser', async function(req, res) {
    var reqParam = req.body
    var token = req.headers.token

    // console.log('带token访问，验证token')

    // if(!token){
    //     res.json({
    //         err_code:405,
    //         message:'此接口必须携带token访问',
    //         data:null
    //     }) 
    //     return  
    // }
    // var data= await UserService.getUserByToken(token)
    // console.log(data)
    // var result= await UserTokenGenerate.checkToken(token).catch(e=>{
    //     res.json({
    //         err_code:404,
    //         message:'token失效或不存在',
    //         token:token
    //     }) 
    //     return  
    // })

    // console.log('result'+result)
    // if(data==null || data.token!=token){
    //     res.json({
    //         err_code:404,
    //         message:'token失效或不存在1',
    //         token:token
    //     }) 
    //     return  
    // }



    var ret = await UserService.addUser(reqParam)
    var data = await UserService.getUserByAccount(reqParam)
    if (ret instanceof Error) {
        res.json({
            err_code: 500,
            message: '服务器忙，稍后再试!' + err,
            data: null
        })
        return
    }
    if (ret == -1) {
        res.json({
            err_code: 402,
            message: '账号已存在',
            data: null
        })
        return
    }
    if (ret == -2) {
        res.json({
            err_code: 403,
            message: '昵称已存在',
            data: null
        })
        return
    }
    res.json({
        err_code: 200,
        message: '用户新增成功',
        data: data
    })
})

userController.put('/updateUser', async function(req, res) {
    var reqParam = req.body
    console.log('带token访问，验证token')
    console.log(reqParam)
    console.log('===========')
    var token = req.headers.token
    var _id = reqParam._id
    if (!_id) {
        res.json({
            err_code: 405,
            message: '参数不合法',
            token: token
        })
        return
    }

    // if (!token) {
    //     res.json({
    //         err_code: 405,
    //         message: '此接口必须携带token访问',
    //         data: null
    //     })
    //     return
    // }
    // var data = await UserService.getUserByToken(token)
    // console.log(data)
    // var result = await UserTokenGenerate.checkToken(token).catch(e => {
    //     res.json({
    //         err_code: 404,
    //         message: 'token失效或不存在',
    //         token: token
    //     })
    //     return
    // })

    // console.log('result' + result)
    // if (data == null || data.token != token) {
    //     res.json({
    //         err_code: 404,
    //         message: 'token失效或不存在1',
    //         token: token
    //     })
    //     return
    // }

    console.log('带token访问，验证token')
    var ret = await UserService.updateOneUser(reqParam)
        //再次查询
    var data = await UserService.getUserById(reqParam)
    if (ret instanceof Error) {
        res.json({
            err_code: 500,
            message: '服务器忙，稍后再试',
            data: null
        })
    }
    res.json({
        err_code: 200,
        message: '用户修改成功',
        data: data
    })
})

userController.delete('/deleteUser', async function(req, res) {
    var reqParam = req.query
    console.log('delete参数')
    console.log(reqParam) //验证请求参数是否合法
    var token = req.headers.token

    console.log('带token访问，验证token')

    // if (!token) {
    //     res.json({
    //         err_code: 405,
    //         message: '此接口必须携带token访问',
    //         data: null
    //     })
    //     return
    // }
    // var data = await UserService.getUserByToken(token)
    // console.log(data)
    // var result = await UserTokenGenerate.checkToken(token).catch(e => {
    //     res.json({
    //         err_code: 404,
    //         message: 'token失效或不存在',
    //         token: token
    //     })
    //     return
    // })

    // console.log('result' + result)
    // if (data == null || data.token != token) {
    //     res.json({
    //         err_code: 404,
    //         message: 'token失效或不存在1',
    //         token: token
    //     })
    //     return
    // }


    var data = await UserService.getUserById(reqParam).catch(e => {
        res.json({
            err_code: 500,
            message: '服务器忙，稍后再试',
            data: null
        })
        return
    })
    var ret = await UserService.deleteOneUser(reqParam)
        //再次查询

    if (ret instanceof Error) {
        res.json({
            err_code: 500,
            message: '服务器忙，稍后再试',
            data: null
        })
        return
    }
    if (ret === 1) {
        res.json({
            err_code: 200,
            message: '用户删除成功',
            data: data
        })
    }
})



userController.get('/users', async function(req, res) {
    var ret = await UserService.findAllLimit2k()
    if (ret instanceof Error) {
        res.json({
            err_code: 500,
            message: '服务器忙，稍后再试',
            data: null
        })
    }
    res.json({
        err_code: 200,
        message: '用户获取成功',
        data: ret
    })
})

userController.get('/getUsers', async function(req, res) {
    var reqParam = req.query

    var ret = await UserService.getUserById(reqParam)
    if (ret instanceof Error) {
        res.json({
            err_code: 500,
            message: '服务器忙，稍后再试',
            data: null
        })
    }
    res.json({
        err_code: 200,
        message: '用户获取成功',
        data: ret
    })
})

userController.get('/getUser', async function(req, res) {
    var reqParam = req.query

    var ret = await UserService.getUserByAccount(reqParam)
    if (ret instanceof Error) {
        res.json({
            err_code: 500,
            message: '服务器忙，稍后再试',
            data: null
        })
    }
    var time = DateTimeUtils.stdDataTime(ret.createTime)
    console.log("===" + time)
    ret.createTime = time
    res.json({
        err_code: 200,
        message: '用户获取成功',
        data: ret
    })
})


userController.get('/checkToken', async function(req, res) {
    var reqParam = req.query

    var ret = await UserService.checkToken(reqParam)
    if (ret instanceof Error) {
        res.json({
            err_code: 500,
            message: '服务器忙，稍后再试',
            data: null
        })
    }
    res.json({
        err_code: 200,
        message: '验证token成功',
        data: ret
    })
})

module.exports = userController