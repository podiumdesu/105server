// query userinfo && edit the name or the password
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/userlist';
var datatest = require("../ddd").testdata;
var replacePwd = require("../ddd").newtestdata;
/***** datatest应该为从client处传过来的JSON信息 ******/
var query = require("./query");
var update = require("./update");

var changePassword = 1;
var changeAvatar = 1;

MongoClient.connect(url, function(err, db) {
    //此处使用jwt验证登陆，验证成功后进行接下来的操作
    var collection = db.collection("user");
    console.log("数据库连接成功！");
    var whereName = {"name": testdata.name};
    if (changePassword === 1) {
        var replacePwd = {"password": newtestdata.password};
        update(db, collection, whereName, replacePwd, function(update_result) {
            if (update_result === -1) {
                console.log("update ERROR");
                db.close();
            }
            if (update_result === 1) {
                console.log("Update password DONE!!");
                db.close();
            }
        });
    }
    if (changeAvatar === 1) {
        var replaceAva = {"avatar_path": newtestdata.avatar_path};
        update(db, collection, whereName, replaceAva, function(update_result) {
            if (update_result === -1) {
                console.log("update ERROR");
                db.close();
            }
            if (update_result === 1) {
                console.log("Update avatar DONE!!");
                db.close();
            }
        });
    }

});


//
