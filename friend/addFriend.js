var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/userlist'
var query = require("../user/query")
var update = require("../user/update")
var auth = require("../user/auth")
var queryFriendship = require("./queryFriendship")
var config = require("../config/config")
var jwt = require("jsonwebtoken")
var insertData = require("../common/insertData")
//testPOSTdata:
//{"token":"", "to": "bbbb"}

function addFriend(postData, callback) {
    MongoClient.connect(url, (err, db) => {
        const collection = db.collection("friendlist")     //db: userlist  col: friendlist
        const collectionUSER = db.collection("user")     //db: userlist  col: friendlist
        //此处使用jwt验证登陆，验证成功后进行接下来的操作
        auth(postData.token, jwt_result => {
            if (jwt_result === '1') {
                console.log("user-friendlist 数据库连接成功！")
                jwt.verify(postData.token, config.secret, (err, decoded) => {   //verify the token
                    //verify whether friendName is in the col "user"
                    let friendName = postData.to
                    query(db, collectionUSER, {"name":friendName}, ifFriendExist_result => {
                        if (ifFriendExist_result === 0) {
                            console.log('Friend hasn\'t registered')
                            callback("-2")
                        } else {
                            postData.decoded = decoded
                            let myName = decoded.name   //get user's name from the token
                            let friendship = {"myName": myName, "friendName": friendName}
                            let reversefriendship = {"myName": friendName, "friendName": myName}
                            queryFriendship(db, collection, friendship, result => {
                                if (result === '1') {
                                    console.log('you are friends at all!!!')
                                    callback('0')
                                } else if (result === '0') {
                                    queryFriendship(db, collection, reversefriendship, result => {
                                        if (result === '0') {
                                            insertData(friendship, db, collection, (err, result) => {
                                                console.log("sss")
                                                console.log('添加成功')
                                                callback('1')
                                            })
                                        } else if (result === '1') {
                                            console.log('you are reverse friends at all!!!')
                                            callback('0')
                                        }
                                    })
                                } else {
                                    console.log('error')
                                    callback('-1')
                                }
                            })
                        }
                    })
                })

            } else if (jwt_result === 'fakepeople') {
                console.log('bad token')
                callback("-5")
            } else if (jwt_result === 'wrong pwd') {
                console.log('wrong pwd')
                callback("-6")
            }
        })
    })
}

module.exports = addFriend
