var mongoose = require("mongoose")
var db = mongoose.createConnection('localhost', 'userlist')   //创建数据库连接

db.on('error', console.error.bind(console, '连接错误：'))
db.on('open', function() {
    console.log('--数据库连接成功--' + new Date().toLocaleString())
})

module.exports = db
