const mongoose = require('../utils/MongodbUtils')

const UserSchma = new mongoose.Schema({
    userId: {
        type: Number,
        required:true
    },
    account: {
        type: String,
        required: true,
        unique:true
    },
    username:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required:true 
    },
    email:{
        type: String,
        required:true,
    },
    type: {
        type: Number,
        default: 0
    },
    activeFlag:{
        type: String,
        default:''
    },
    token:{
        type: String,
        default:''
    },
    flag:{
        type: String,
        default:'false'
    },
    describ:{
        type: String,
        default:''
    },
    createTime:{
        type:Date,
        default:Date.now
    },
    updateTime:{
        type:Date,
        default:Date.now
    }
    

})

module.exports = mongoose.model('User', UserSchma)