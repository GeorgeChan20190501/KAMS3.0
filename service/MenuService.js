const Menu = require('../models/Menu')

/**
 * 查询菜单前1000
 * @author George
 * @method findAllLimit1k
 * @return {object} 异常e | 成功data
 * @version v1.0
 */
exports.findAllLimit1k = function(menu) {
    console.log("参数=" + menu)
    return new Promise((resolve, reject) => {
        Menu.find({
            label: { $regex: menu }
        }, (e, data) => {
            if (e) reject(e)
            resolve(data)
        }).limit(1000)
    })
}


exports.getMenuByName = function(menu) {
    return new Promise((resolve, reject) => {
        Menu.findOne({
            label: menu.label
        }, (e, data) => {
            if (e) reject(e)
            resolve(data)
        })
    })
}

exports.getMenuById = function(menu) {
    return new Promise((resolve, reject) => {
        Menu.findOne({
            _id: menu._id
        }, (e, data) => {
            if (e) reject(e)
            resolve(data)
        })
    })
}

function getMenuByName(menu) {
    console.log('getMenuByName 查询')
    return new Promise((resolve, reject) => {
        Menu.find({
            label: menu.label
        }, (e, data) => {
            if (e) reject(e)
            resolve(data)
        })
    })
}


exports.addMenu = async function(menu) {

    var label1 = await getMenuByName(menu);
    console.log(label1)
    var ret = 1;
    if (label1 != null && label1.length > 0) {
        ret = -1
        return ret
    }
    var newMenu = new Menu({
        id: menu.id,
        pid: menu.pid,
        label: menu.label,
        pageUrl: menu.pageUrl,
    })
    return new Promise((resolve, reject) => {
        newMenu.save((e) => {
            if (e) {
                console.log('错误打印')
                console.log(e)
                reject(e)
            }
            resolve(ret)
        })
    })
}


/**
 * 删除单个菜单
 * @author George
 * @method deleteOneMenu
 * @param  {object} Menu 传入需要删除的对象
 * @return {object} 异常e | 成功1
 * @version v1.0
 */
exports.deleteOneMenu = function(menu) {
    return new Promise((resolve, reject) => {
        Menu.deleteOne({
            _id: menu._id
        }, (e) => {
            if (e) reject(e)
            resolve(1)
        })
    })
}


/**
 * 更新单个用户
 * @author George
 * @日期   2020-08-23
 * @method updateOneMenu
 * @param  {object} menu 传入需要更新的对象
 * @return {object} 异常e | 成功1
 * @version v1.0
 */
exports.updateOneMenu = function(menu) {
    console.log('updateOneMenu')
    menu.updateTime = new Date()
    return new Promise((resolve, reject) => {

        Menu.updateOne({
            _id: menu._id
        }, {
            $set: {
                label: menu.label,
                pageUrl: menu.pageUrl,
                describ: menu.describ,
                is_deleted: menu.is_deleted,
                updateTime: menu.updateTime,
                children: menu.children
            }
        }, e => {
            if (e) reject(e)
            resolve(1)
        })

    })
}