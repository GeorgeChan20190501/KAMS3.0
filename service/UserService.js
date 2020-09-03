const User = require('../models/User')


function getNextId() {
    return new Promise((resolve, reject) => {
        User.find((e, data) => {
            if (e) reject(e)
            if (data != null && data.length == 0) {
                resolve(10000)
            } else {
                resolve(data[0].userId + 1)
            }
        }).sort({ userId: -1 }).limit(1)
    })
}


exports.getUserById = function(user) {

    return new Promise((resolve, reject) => {
        User.findOne({
            _id: user._id
        }, (e, data) => {
            if (e) reject(e)
            resolve(data)
        })
    })
}

exports.getUserByToken = function(token) {
    return new Promise((resolve, reject) => {
        User.findOne({
            token: token
        }, (e, data) => {
            if (e) reject(e)
            resolve(data)
        })
    })
}

exports.getUserByAccount = function(user) {
    return new Promise((resolve, reject) => {
        User.findOne({
            account: user.account
        }, (e, data) => {
            if (e) reject(e)
            resolve(data)
        })
    })
}

exports.checkToken = function(user) {
    return new Promise((resolve, reject) => {
        User.findOne({
            account: user.account,
            token: user.token
        }, (e, data) => {
            if (e) reject(e)
            resolve(data)
        })
    })
}

function getUserByAccout(user) {
    return new Promise((resolve, reject) => {
        User.findOne({
            account: user.account
        }, (e, data) => {
            if (e) reject(e)
            resolve(data)
        })
    })
}

function getUserByUserName(user) {
    return new Promise((resolve, reject) => {
        User.findOne({
            username: user.username
        }, (e, data) => {
            if (e) reject(e)
            resolve(data)
        })
    })
}

exports.checkUser = function(user) {
        return new Promise((resolve, reject) => {
            User.findOne({
                account: user.account,
                password: user.password
            }, (e, data) => {
                if (e) reject(e)
                if (data == null) {
                    resolve(false)
                }
                resolve(true)
            })
        })
    }
    /**
     * 更新单个用户
     * @author George
     * @日期   2020-08-23
     * @method updateOneUser
     * @param  {object} user 传入需要更新的对象
     * @return {object} 异常e | 成功1
     * @version v1.0
     */
exports.updateOneUser = function(user) {
    console.log('updateOneUser')
    return new Promise((resolve, reject) => {

        User.updateOne({
            _id: user._id
        }, {
            password: user.password,
            email: user.email,
            username: user.username,
            roleName: user.roleName
        }, e => {
            if (e) reject(e)
            resolve(1)
        })

    })
}

/**
 * 更新单个用户Token
 * @author George
 * @日期   2020-08-23
 * @method updateUserToken
 * @param  {object} user 传入需要更新的对象
 * @return {object} 异常e | 成功1
 * @version v1.0
 */
exports.updateUserToken = function(user) {
    console.log('token' + user.token)
    return new Promise((resolve, reject) => {
        User.updateOne({
            account: user.account
        }, {
            token: user.token
        }, e => {
            if (e) reject(e)
            resolve(1)
        })

    })
}


/**
 * 更新多个用户
 * @author George
 * @日期   2020-08-23
 * @method deleteManyUser
 * @param  {object} user 传入需要更新的对象ID数组
 * @return {object} 异常e | 成功1
 * @version v1.0
 */
exports.updateManyUser = function(arr, setter) {
    return new Promise((resolve, reject) => {
        User.updateMany({
            _id: arr
        }, {
            password: setter.password,
            email: setter.email
        }, (e) => {
            if (e) reject(e)
            resolve(1)
        })
    })
}

/**
 * 删除单个用户
 * @author George
 * @method deleteOneUser
 * @param  {object} user 传入需要删除的对象
 * @return {object} 异常e | 成功1
 * @version v1.0
 */
exports.deleteOneUser = function(user) {
        return new Promise((resolve, reject) => {
            User.deleteOne({
                _id: user._id
            }, (e) => {
                if (e) reject(e)
                resolve(1)
            })
        })
    }
    /**
     * 删除多个用户
     * @author George
     * @日期   2020-08-23
     * @method deleteManyUser
     * @param  {object} user 传入需要删除的对象ID数组
     * @return {object} 异常e | 成功1
     * @version v1.0
     */
exports.deleteManyUser = function(arr) {
    console.log('deleteUser')
    return new Promise((resolve, reject) => {
        User.deleteOne({
            _id: arr
        }, (e) => {
            if (e) reject(e)
            resolve(1)
        })
    })
}

exports.addUser = async function(user) {
    var nextId = await getNextId();
    var account1 = await getUserByAccout(user);
    var username1 = await getUserByUserName(user);
    var ret = 1;
    if (account1 != null) {
        ret = -1
        return ret
    }
    if (username1 != null) {
        ret = -2
        return ret
    }
    var newUser = new User({
        userId: nextId,
        account: user.account,
        username: user.username,
        password: user.password,
        email: user.email
    })
    return new Promise((resolve, reject) => {
        newUser.save((e) => {
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
 * 返回 Promise
 */
exports.findAllLimit2k = function() {

    return new Promise((resolve, reject) => {
        User.find((e, data) => {
            if (e) reject(e)
            resolve(data)
        }).limit(2000)
    })
}