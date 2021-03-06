const mongoose = require('../utils/MongodbUtils')
var Schema = mongoose.Schema
const MenuSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    pid: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true,
    },
    pageUrl: {
        type: String,
        default: ''
    },
    flag: {
        type: Number,
        default: 1
    },
    describ: {
        type: String,
        default: ''
    },
    is_deleted: {
        type: Number,
        default: 0
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    },
    children: []
})


module.exports = mongoose.model('Menu', MenuSchema)