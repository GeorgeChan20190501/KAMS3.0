const mongoose = require('../utils/MongodbUtils')

const RightSchma = new mongoose.Schema({
    roleId: {
        type: Number,
        required: true
    },
    roleName: {
        type: String,
        default: '普通用户'
    },
    right: [],
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

module.exports = mongoose.model('Right', RightSchma)