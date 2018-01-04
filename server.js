//server.js

let express = require('express');
let app = new express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);
let bodyParser = require("body-parser");
var register = require("./user/register");
var login = require("./user/login");
var edit = require("./user/edit");
//将 socket.io 绑定到服务器上，于是任何连接到该服务器的客户端都具备了实时通信功能。
server.listen(2333);
//Warning: express4.0 seperate the body-parser, so we need to config it.
app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));

console.log("hello, the server is running at port: 2333 , HAVE A NICE DAY! ");

app.post('/user/register', (req, res) => {
    register(req.body, result => {
        //注册成功
        if (result === "1") {
            res.write("200");
            res.end();
        }
        //注册失败
        if (result === "-1") {
            //res.send(400);
            res.write("404");
            res.end();
        }
        //用户已注册
        if (result === "-2") {
            res.write("500");
            res.end();
        }
    });
});
app.post('/user/login', (req, res) => {
    login(req.body, result => {
        //登陆成功
        if (result === "1") {
            res.write("200");
            res.end();
        }
        //密码错误
        if (result === "-2") {
            res.write("400");
            res.end();
        }
        //用户未注册
        if (result === "-1") {
            res.write("404");
            res.end();
        }
    });
});
app.post('/user/edit', (req, res) => {
    if (req.body.pwd && req.body.ava) {
        // todo
        //不可同时修改密码和头像
        res.write("500");
        res.end();
    }
    edit(req.body.user_info, req.body.pwd, req.body.ava, result => {
        if (result === "1") {     // 修改密码成功
            res.write("200");
        } else if (result === "2") {   // 修改头像成功
            res.write("201");
        } else if (result === "-1") {  //修改密码失败
            res.write("500");
        } else {     //修改头像失败
            res.write("501");
        }
        res.end();
    });
})
//服务器监听所有客户端，并返回该新连接对象
io.sockets.on('connection', socket => {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', data => {
      console.log(data);
    });
});
