// 用于token认证
// callback:
// "fakepeople"  === wrong token
// "1" === success
// "wrong pwd" === wrong password, the token may be expired

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/userlist'
var query = require("./query")
var jwt = require("jsonwebtoken")
var config = require("../config/config")

function auth(token, callback) {
    MongoClient.connect(url, (err, db) => {
        var collection = db.collection("user")
        console.log("数据库连接成功！")
        if (token) {
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    callback("fakepeople")   //假人
                } else {
                    token.decoded = decoded
                    query(db, collection, {"name": decoded.name}, query_name_result => {
                        if (query_name_result === 1) {
                            //name 存在，此时检查name 和password两个键是否匹配
                            let user_info = {"name": decoded.name, "password": decoded.password}
                            query(db, collection, user_info, query_password_result => {
                                if (query_password_result === 1) {
                                    callback("1")   //登陆成功
                                    db.close()
                                } else {
                                    callback("wrong pwd")   //密码错误
                                    db.close()
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

module.exports = auth

//
