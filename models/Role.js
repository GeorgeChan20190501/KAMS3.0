const mongoose = require('../utils/MongodbUtils')

const RoleSchma = new mongoose.Schema({
    roleId: {
        type: Number,
        required: true
    },
    roleName: {
        type: String,
        required: true,
        default: '普通用户'
    },
    flag: {
        type: Number,
        default: 1
    },
    describ: {
        type: String,
        default: ''
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Role', RoleSchma)