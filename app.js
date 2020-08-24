const express = require('express')
const app = express()
const userController = require('./controller/UserController')

app.use(userController)
app.listen(8080,function(){
    console.log('后台服务已成功启动!');
})