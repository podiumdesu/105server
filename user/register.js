var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/userlist';
var newtestdata = require("../ddd").newtestdata;
var datatest = require("../ddd").testdata;
/***** datatest应该为从client处传过来的JSON信息 ******/
var query = require("./query");
/*
MongoClient.connect( url, function(err, db) {
    if (err) throw err;
    console.log("database has been initialized!!!");
    db.close();
})

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.createCollection("user", function(err, res) {
        if (err) throw err;
        console.log("collection has been initialized!!!");
        db.close();
    });
});
*/

var insertData = function(datatest, db, collection, callback) {
    collection.insert(datatest, function(err, result) {
        if (err) {
            console.log("ERROR:" + err);
            return;
        }
        callback(result);
    });
}

MongoClient.connect(url, function(err, db) {
    var collection = db.collection("user");
    console.log("数据库连接成功！");
    query(db, collection, {"name": testdata.name}, function(query_result) {
        if (query_result === 1) {
            console.log(testdata);
            console.log("用户已注册，不可重复注册");
            db.close();
        } else if(query_result === -1) {
            console.log("出错了!!!");
            db.close();
        }else {
            insertData(datatest, db, collection, function(insert_result) {
                console.log(insert_result);
                console.log("注册成功！");
                db.close();
            });
        }
    });

});
