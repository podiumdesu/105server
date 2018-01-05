var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
//ver217 === hentai

server.listen(8888)

console.log("listen at PORT 8888")
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html')
})

io.on('connection', function (socket) {
    console.log(socket)
  socket.emit('news', "hello, this is the server")
  socket.on('my other event', function (data) {
    console.log(data)
  })
})
