const Role = require('../models/Role')



function getNextId() {
    return new Promise((resolve, reject) => {
        Role.find((e, data) => {
            if (e) reject(e)
            if (data != null && data.length == 0) {
                resolve(100)
            } else {
                resolve(data[0].roleId + 1)
            }
        }).sort({ roleId: -1 }).limit(1)
    })
}

/**
 * 查询菜单前1000
 * @author George
 * @method findAllLimit1k
 * @return {object} 异常e | 成功data
 * @version v1.0
 */
exports.findAllLimit1kByKey = function(role) {

    return new Promise((resolve, reject) => {
        Role.find({
            roleName: { $regex: role }
        }, (e, data) => {
            if (e) reject(e)
            resolve(data)
        }).limit(1000)
    })
}

exports.getRoleByName = function(role) {
    return new Promise((resolve, reject) => {
        Role.findOne({
            roleName: role.roleName
        }, (e, data) => {
            if (e) reject(e)
            resolve(data)
        })
    })
}

exports.getRoleById = function(role) {
    return new Promise((resolve, reject) => {
        Role.findOne({
            _id: role._id
        }, (e, data) => {
            if (e) reject(e)
            resolve(data)
        })
    })
}

function getRoleByName(role) {
    console.log('getRoleByName 查询')
    return new Promise((resolve, reject) => {
        Role.find({
            roleName: role.roleName
        }, (e, data) => {
            if (e) reject(e)
            resolve(data)
        })
    })
}


exports.addRole = async function(role) {
    var nextId = await getNextId();

    var rolename1 = await getRoleByName(role);
    console.log(rolename1)
    var ret = 1;
    if (rolename1 != null && rolename1.length > 0) {
        ret = -1
        return ret
    }
    var newRole = new Role({
        roleId: nextId,
        roleName: role.roleName,
        describ: role.describ
    })
    return new Promise((resolve, reject) => {
        newRole.save((e) => {
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
 * 删除单个角色
 * @author George
 * @method deleteOneRole
 * @param  {object} Role 传入需要删除的对象
 * @return {object} 异常e | 成功1
 * @version v1.0
 */
exports.deleteOneRole = function(role) {
    return new Promise((resolve, reject) => {
        Role.deleteOne({
            _id: role._id
        }, (e) => {
            if (e) reject(e)
            resolve(1)
        })
    })
}


/**
 * 更新单个角色
 * @author George
 * @日期   2020-08-23
 * @method updateOneRole
 * @param  {object} Role 传入需要更新的对象
 * @return {object} 异常e | 成功1
 * @version v1.0
 */
exports.updateOneRole = function(role) {
    console.log('updateOneRole')
    role.updateTime = new Date()
    return new Promise((resolve, reject) => {

        Role.updateOne({
            _id: role._id
        }, {
            roleName: role.roleName,
            roleId: role.roleId,
            describ: role.describ,
            updateTime: role.updateTime
        }, e => {
            if (e) reject(e)
            resolve(1)
        })

    })
}