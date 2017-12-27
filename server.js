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
        res.write(result);
        res.end();
    });
});
app.post('/user/login', (req, res) => {
    login(req.body, result => {
        res.write(result);
        res.end();
    });
});
app.post('/user/edit', (req, res) => {
    if (req.body.pwd && req.body.ava) {    //不可以同时修改，会爆炸！！！！！！！！
        // todo
        res.write("gg");
        res.end();
        // edit(req.body.user_info, req.body.pwd, req.body.ava, result => {
        //     res.write(result);
        //     res.end();
        // });
    }
    edit(req.body.user_info, req.body.pwd, req.body.ava, result => {
        res.write(result);
        res.end();
    });
    res.write("nothing changed");
})
//服务器监听所有客户端，并返回该新连接对象
io.sockets.on('connection', socket => {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', data => {
      console.log(data);
    });
});
