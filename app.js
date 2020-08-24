const express = require('express')
const app = express()
const userController = require('./controller/UserController')
const menuController = require('./controller/MenuController')



app.all("*", function(req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.sendStatus(200); //让options尝试请求快速结束
    else
        next();
})
app.use(userController)
app.use(menuController)
app.listen(8082, function() {
    console.log('后台服务已成功启动!');
})