var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/user'
var query = require("../user/query")
var update = require("../user/update")
var auth = require("../user/auth")
//testPOSTdata:
//{"token":"", "from": "aaaa", "to": "bbbb"}

function edit(user_info, changePassword, changeAvatar, callback) {
    MongoClient.connect(url, (err, db) => {
        //此处使用jwt验证登陆，验证成功后进行接下来的操作
        const collection = db.collection("friendlist")
        console.log("数据库连接成功！")

        const whereName = {"name": user_info.name}
        if (changePassword === 1) {
            const replacePwd = {"password": user_info.password}
            update(db, collection, whereName, replacePwd, update_result => {
                if (update_result === -1) {
                    console.log("update ERROR")
                    callback("-1")
                    db.close()
                }
                if (update_result === 1) {
                    console.log("Update password DONE!!")
                    callback("1")
                    db.close()
                }
            })
        }
        if (changeAvatar === 1) {
            const replaceAva = {"avatar_path": user_info.avatar_path}
            update(db, collection, whereName, replaceAva, update_result => {
                if (update_result === -1) {
                    console.log("update ERROR")
                    callback("-2")
                    db.close()
                }
                if (update_result === 1) {
                    console.log("Update avatar DONE!!")
                    callback("2")
                    db.close()
                }
            })
        }
    })
}

module.exports = edit
