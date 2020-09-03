const express = require('express')
const bodyParser = require('body-parser')
const rightController = express.Router()
const RightService = require('../service/RightService')
rightController.use(bodyParser.urlencoded({ extended: true }))
rightController.use(bodyParser.json())


rightController.get('/testRight', function(req, res) {
    res.json({
        err_code: 200,
        message: '测试通过 testRight',
    })
})



rightController.post('/grant', async function(req, res) {
    var reqParam = req.body
    console.log(reqParam)

    console.log("=======")

    var roleId = reqParam.roleId
    var roleName = reqParam.roleName
    var right = reqParam.right
    console.log("=====right==")
    console.log(right)
    if (!roleId || !roleName) {
        res.json({
            err_code: 405,
            message: '参数不合法'
        })
        return
    }

    //var children = JSON.parse(reqParam.children)
    //console.log(typeof children)

    console.log("=====2222==")
    console.log(roleId)
    console.log(roleName)
    var ret = await RightService.grant(reqParam).catch(e => {
            console.log("=====eeeee==" + e)
            res.json({
                err_code: 500,
                message: '服务器忙，稍后再试',
                data: e
            })
            return
        })
        //再次查询
    var data = await RightService.getRightByRoleId(reqParam)
    if (ret instanceof Error) {
        res.json({
            err_code: 500,
            message: '服务器忙，稍后再试',
            data: null
        })
        return
    }
    res.json({
        err_code: 200,
        message: '权限设置成功',
        data: data
    })
})


rightController.get('/right', async function(req, res) {
    var reqParam = req.query
    console.log("hou---")
    console.log(reqParam)
    var ret = await RightService.getRightByRoleId(reqParam)
    if (ret instanceof Error) {
        res.json({
            err_code: 500,
            message: '服务器忙，稍后再试',
            data: null
        })
    }
    res.json({
        err_code: 200,
        message: '角色获取成功',
        data: ret
    })
})

rightController.get('/rights', async function(req, res) {
    var ret = await RightService.getRight()
    if (ret instanceof Error) {
        res.json({
            err_code: 500,
            message: '服务器忙，稍后再试',
            data: null
        })
    }
    res.json({
        err_code: 200,
        message: '角色获取成功',
        data: ret
    })
})




rightController.put('/updateRight', async function(req, res) {
    var reqParam = req.body
    console.log(reqParam)
    console.log("=======")
    var _id = reqParam._id
    var roleId = reqParam.roleId;
    var roleName = reqParam.roleName;

    if (!_id || !roleId || !roleName) {
        res.json({
            err_code: 405,
            message: '参数不合法'
        })
        return
    }

    var ret = await RightService.updateOneRight(reqParam).catch(e => {
            res.json({
                err_code: 500,
                message: '服务器忙，稍后再试',
                data: e
            })
        })
        //再次查询
    var data = await RightService.getRightByRoleId(reqParam)
    if (ret instanceof Error) {
        res.json({
            err_code: 500,
            message: '服务器忙，稍后再试',
            data: null
        })
    }
    res.json({
        err_code: 200,
        message: '角色修改成功',
        data: data
    })
})
module.exports = rightController