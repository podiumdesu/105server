var mongoose = require("mongoose");
var db = mongoose.createConnection("localhost","runoob");
db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
  //一次打开记录
    console.log("yes");
    var ss = db.runoob.find();
    console.log(ss);
});
