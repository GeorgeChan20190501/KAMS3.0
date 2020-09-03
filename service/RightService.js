const Right = require('../models/Right')

/**
 * 查询菜单前1000
 * @author George
 * @method findAllLimit1k
 * @return {object} 异常e | 成功data
 * @version v1.0
 */
exports.findAllLimit1kByKey = function(right) {

    return new Promise((resolve, reject) => {
        Right.find({
            rightName: { $regex: right }
        }, (e, data) => {
            if (e) reject(e)
            resolve(data)
        }).limit(1000)
    })
}

exports.getRightByRoleId = function(right) {
    return new Promise((resolve, reject) => {
        Right.findOne({
            roleId: right.roleId
        }, (e, data) => {
            if (e) reject(e)
            resolve(data)
        })
    })
}

exports.getRight = function() {
    return new Promise((resolve, reject) => {
        Right.find((e, data) => {
            if (e) reject(e)
            resolve(data)
        })
    })
}


function getRightByRoleId(right) {
    console.log("###########11111" + right.roleId)
    return new Promise((resolve, reject) => {
        Right.findOne({
            roleId: right.roleId
        }, (e, data) => {
            if (e) reject(e)
            resolve(data)
        })
    })
}

exports.updateOneRight = function(right) {
    console.log('updateOneRight')
    Right.updateTime = new Date()
    return new Promise((resolve, reject) => {

        Right.updateOne({
            _id: right._id
        }, {
            roleName: right.roleName,
            roleId: right.roleId,
            right: right.right,
            describ: right.describ,
            updateTime: right.updateTime
        }, e => {
            if (e) reject(e)
            resolve(1)
        })

    })
}

exports.grant = async function(right) {
    //先查询有没有，没有就新增，否则更新。
    console.log("###########")
    console.log(right)
    var a = await getRightByRoleId(right);
    console.log("###########")
    console.log(a)
    if (a == null) {
        var right1 = new Right({
            roleId: right.roleId,
            roleName: right.roleName,
            right: right.right,
            describ: right.describ
        })
        return new Promise((resolve, reject) => {
            right1.save(e => {
                if (e) reject(e)
                resolve(1)
            })
        })
    } else {
        right.updateTime = new Date()
        return new Promise((resolve, reject) => {
            Right.updateOne({
                roleId: right.roleId
            }, {
                roleName: right.roleName,
                roleId: right.roleId,
                right: right.right,
                describ: right.describ,
                updateTime: right.updateTime
            }, e => {
                if (e) reject(e)
                resolve(1)
            })

        })
    }

}