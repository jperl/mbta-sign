import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import { getFrame } from './output';

const app = express();
app.use(express.static(__dirname + '/public'));

const server = http.createServer(app);
const io = socketIo.listen(server);

server.listen(8080);
console.log('Server running on 127.0.0.1:8080');

io.on('connection', function (socket) {
  socket.emit('draw', getFrame());
});

setInterval(function () {
  io.emit('draw', getFrame());
}, 10000);

