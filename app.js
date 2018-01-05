var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

const PORT = 8888;
app.listen(PORT);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('disconnet', function() {
      io.sockets.emit('leave', username)
  })

  socket.on('sendMessage', function(data) {
      io.sockets.emit('receiveMessage', data)
  })
});
