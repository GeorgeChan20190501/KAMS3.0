const express = require('express')
const bodyParser = require('body-parser')
const menuController = express.Router()
const MenuService = require('../service/MenuService')
menuController.use(bodyParser.urlencoded({ extended: true }))
menuController.use(bodyParser.json())


menuController.get('/test', function(req, res) {
    res.json({
        err_code: 200,
        message: '测试通过',
    })
})




menuController.post('/addMenu', async function(req, res) {
    var reqParam = req.body
    console.log(reqParam)
    var ret = await MenuService.addMenu(reqParam)
    var data = await MenuService.getMenuByName(reqParam)
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
            message: '菜单已存在',
            data: null
        })
        return
    }

    res.json({
        err_code: 200,
        message: '菜单新增成功',
        data: data
    })
})

menuController.put('/updateMenu', async function(req, res) {
    var reqParam = req.body

    console.log("====更新菜单参数===")
    console.log(reqParam)

    console.log("====SSSS===")

    var children = reqParam.children

    console.log("=======")
    console.log(children)
    console.log(typeof children)


    //var children = JSON.parse(reqParam.children)
    //console.log(typeof children)

    reqParam.children = children
    var _id = reqParam._id
    if (!_id) {
        res.json({
            err_code: 405,
            message: '参数不合法'
        })
        return
    }

    var ret = await MenuService.updateOneMenu(reqParam).catch(e => {
            res.json({
                err_code: 500,
                message: '服务器忙，稍后再试',
                data: e
            })
            return
        })
        //再次查询
    var data = await MenuService.getMenuById(reqParam)
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
        message: '菜单修改成功',
        data: data
    })
})

menuController.delete('/deleteMenu', async function(req, res) {
    var reqParam = req.query
    console.log('delete参数')
    console.log(reqParam) //验证请求参数是否合法
    var _id = reqParam._id
    if (!_id) {
        res.json({
            err_code: 405,
            message: '参数不合法'
        })
        return
    }

    var data = await MenuService.getMenuById(reqParam).catch(e => {
        res.json({
            err_code: 500,
            message: '服务器忙，稍后再试',
            data: null
        })
        return
    })
    var ret = await MenuService.deleteOneMenu(reqParam)
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



menuController.get('/menus', async function(req, res) {
    var reqParam = req.query.param
    console.log(reqParam)
    var ret = await MenuService.findAllLimit1k(reqParam)
    if (ret instanceof Error) {
        res.json({
            err_code: 500,
            message: '服务器忙，稍后再试',
            data: null
        })
    }
    res.json({
        err_code: 200,
        message: '菜单获取成功',
        data: ret
    })
})


module.exports = menuController