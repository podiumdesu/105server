//server.js
let express = require('express')
let app = new express()
let server = require('http').createServer(app)
let io = require('socket.io').listen(server)
let bodyParser = require("body-parser")
var jwt = require("jsonwebtoken")

var register = require("./user/register")
var login = require("./user/login")
var edit = require("./user/edit")
var auth = require("./user/auth")
var addFriend = require("./friend/addFriend")

var config = require("./config/config")

//将 socket.io 绑定到服务器上，于是任何连接到该服务器的客户端都具备了实时通信功能。
server.listen(2333)
//Warning: express4.0 seperate the body-parser, so we need to config it.
app.set("secret", config.secret)
app.use(bodyParser.json({limit: '1mb'}))  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}))

console.log("hello, the server is running at port: 2333 , HAVE A NICE DAY! ")
app.post('/user/register', (req, res) => {
    register(req.body, result => {
        //注册成功
        if (result === "1") {
            res.write("200")
            res.end()
        }
        //注册失败
        if (result === "-1") {
            res.write("400")
            res.end()
        }
        //用户已注册
        if (result === "-2") {
            res.write("500")
            res.end()
        }
    })
})
app.post('/user/login', (req, res) => {
    login(req.body, result => {
        //登陆成功
        console.log(req.body)
        if (result === "1") {
            let token = jwt.sign(req.body, app.get("secret"), {
                expiresIn: 60*60*24
            })
            res.json({
                message: "200",
                token: token
            })
        }
        //密码错误
        if (result === "-2") {
            res.write("400")
            res.end()
        }
        //用户未注册
        if (result === "-1") {
            res.write("404")
            res.end()
        }
    })
})

app.post('/user/auth', (req, res) => {
    // if (token) {
    //     jwt.verify(token, app.get("secret"), (err, decoded) => {
    //         if (err) {
    //             return res.json({success: false, message: 'Failed to authenticate token.'})
    //         } else {
    //             req.decoded = decoded
    //             console.log("test: jwt.req.decoded.name: " + req.decoded.name)
    //             console.log("test: jwt.req.decoded.password: " + req.decoded.password)
    //             //认证成功
    //             res.write("200")
    //             res.end()
    //         }
    //     })
    // }
    var token = req.body.token || req.headers['x-access-token']
    auth(token, result => {
        if (result === '1') {
            console.log("登陆成功")
            res.status(200)
            res.write("登陆成功")
            res.end()
        } else if (result === 'wrong pwd') {
            console.log("密码错误")
            res.status(400)
            res.write("密码错误")
            res.end()
        } else if (result === 'fakepeople') {
            console.log('bad token')
            res.status(400)
            res.write('wrong authentication to this token')
            res.end()
        } else {}
    })
})
app.post('/user/edit', (req, res) => {
    if (req.body.pwd && req.body.ava) {    //不可以同时修改，会爆炸！！！！！！！！
        // todo
        //密码和头像不可同时修改
        res.write("gg")
        res.end()
    }
    edit(req.body.user_info, req.body.pwd, req.body.ava, result => {
        if (result === "1") {   //密码修改成功
            let user_info = req.body.user_info
            let token = jwt.sign(user_info, app.get("secret"), {
                expiresIn: 60*60*24
            })
            res.json({
                message: "200",
                token: token
            })
        } else if (result === "2") {   //头像修改成功
            res.write("201")
            res.end()
        } else if (result === "-1") {   //密码修改失败
            res.write("500")
            res.end()
        } else {      //头像修改失败
            res.write("501")
            res.end()
        }
    })
})
//服务器监听所有客户端，并返回该新连接对象
io.sockets.on('connection', socket => {
    socket.emit('news', { hello: 'world' })
    socket.on('my other event', data => {
      console.log(data)
    })
})
