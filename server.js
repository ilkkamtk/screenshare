const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('initiate', () => {
    console.log('initiate received');
    io.emit('initiate');
  });

  socket.on('offer', (data) => {
    console.log('offer recieved');
    socket.broadcast.emit('offer', data);
  });

});

app.use(express.static('public'));
app.use('/modules', express.static('node_modules'));

http.listen(3000, () => console.log('Example app listening on port 3000!'));
