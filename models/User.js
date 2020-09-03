const mongoose = require('../utils/MongodbUtils')

const UserSchma = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    account: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    roleName: {
        type: String,
        default: '普通用户'
    },
    type: {
        type: Number,
        default: 0
    },
    activeFlag: {
        type: String,
        default: ''
    },
    token: {
        type: String,
        default: ''
    },
    flag: {
        type: Boolean,
        default: true
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

module.exports = mongoose.model('User', UserSchma)