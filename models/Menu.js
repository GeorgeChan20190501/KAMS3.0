const mongoose = require('../utils/MongodbUtils')
var Schema = mongoose.Schema
const MenuSchema = new Schema({
    menuId: {
        type: Number,
        required: true
    },
    menuName: {
        type: String,
        required: true,

    },
    pageUrl: {
        type: String,
        default: ''
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