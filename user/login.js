var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/userlist';
var datatest = require("../ddd").testdata;
var query = require("./query");

function login(user_data, callback) {
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection("user");
        console.log("数据库连接成功！");
        query(db, collection, {"name": user_data.name}, function(query_name_result) {
            if (query_name_result === 1) {
                // name 存在，此时检查name 和password两个键是否匹配
                query(db, collection, user_data, function(query_password_result) {
                    if (query_password_result === 1) {
                        console.log("登陆成功！");
                        callback("yes")
                        db.close();
                    } else {
                        console.log("密码错误！");
                        callback("wrong pwd");
                        db.close();
                    }
                });
            } else {
                console.log("请先注册！");
                callback("please register");
                db.close();
            }
        });
    });
}

module.exports = login;


//
