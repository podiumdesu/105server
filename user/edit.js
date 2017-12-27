// query userinfo && edit the name or the password
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/userlist';
var query = require("./query");
var update = require("./update");
//testPOSTdata:
//{"user_info": {"name":"lhx", "password": "newpwd", "avatar_path": "/ddd/dddsd"}, "pwd": 1, "ava": 1}

function edit(user_info, changePassword, changeAvatar, callback) {
    MongoClient.connect(url, (err, db) => {
        //此处使用jwt验证登陆，验证成功后进行接下来的操作
        const collection = db.collection("user");
        console.log("数据库连接成功！");
        const whereName = {"name": user_info.name};
        if (changePassword === 1) {
            const replacePwd = {"password": user_info.password};
            update(db, collection, whereName, replacePwd, function(update_result) {
                if (update_result === -1) {
                    console.log("update ERROR");
                    callback("pwd change error!");
                    db.close();
                }
                if (update_result === 1) {
                    console.log("Update password DONE!!");
                    callback("pwd change done!");
                    db.close();
                }
            });
        }
        if (changeAvatar === 1) {
            var replaceAva = {"avatar_path": user_info.avatar_path};
            update(db, collection, whereName, replaceAva, function(update_result) {
                if (update_result === -1) {
                    console.log("update ERROR");
                    callback("avatar update ERROR!");
                    db.close();
                }
                if (update_result === 1) {
                    console.log("Update avatar DONE!!");
                    callback("avatar update DONE!");
                    db.close();
                }
            });
        }
    });
}

module.exports = edit;
