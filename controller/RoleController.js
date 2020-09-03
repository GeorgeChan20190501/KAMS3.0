const express = require('express')
const bodyParser = require('body-parser')
const roleController = express.Router()
const RoleService = require('../service/RoleService')
roleController.use(bodyParser.urlencoded({ extended: true }))
roleController.use(bodyParser.json())


roleController.get('/testRole', function(req, res) {
    res.json({
        err_code: 200,
        message: '测试通过testRole',
    })
})




roleController.post('/addRole', async function(req, res) {
    var reqParam = req.body

    var ret = await RoleService.addRole(reqParam)
    var roleName = reqParam.roleName
    if (!roleName) {
        res.json({
            err_code: 405,
            message: '角色名必须填写',
            data: null
        })
        return
    }
    var data = await RoleService.getRoleByName(reqParam)
    console.log(ret)
    console.log(data)
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
            message: '角色名已存在',
            data: null
        })
        return
    }

    res.json({
        err_code: 200,
        message: '角色新增成功',
        data: data
    })
})

roleController.put('/updateRole', async function(req, res) {
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

    var ret = await RoleService.updateOneRole(reqParam).catch(e => {
            res.json({
                err_code: 500,
                message: '服务器忙，稍后再试',
                data: e
            })
        })
        //再次查询
    var data = await RoleService.getRoleById(reqParam)
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

roleController.delete('/deleteRole', async function(req, res) {
    var reqParam = req.query
    console.log('delete参数')
    console.log(reqParam) //验证请求参数是否合法
    var _id = reqParam._id
    console.log("_id" + _id)
    if (!_id) {
        res.json({
            err_code: 405,
            message: '参数不合法'
        })
        return
    }

    var data = await RoleService.getRoleById(reqParam).catch(e => {
        res.json({
            err_code: 500,
            message: '服务器忙，稍后再试',
            data: null
        })
        return
    })
    var ret = await RoleService.deleteOneRole(reqParam)
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
            message: '角色删除成功',
            data: data
        })
    }
})



roleController.get('/roles', async function(req, res) {
    var reqParam = req.query.param
    var ret = await RoleService.findAllLimit1kByKey(reqParam)
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

module.exports = roleController