const net = require('net');

(function () {
    const server = net.createServer(function (socket) {
        socket.on('end', () => console.log('Client disconnected 😔'));
        socket.on('data', (data) => console.log(`You sent the following: ${data}`));
        socket.write('Echo server\r\n');
    });

    server.listen(1337, '127.0.0.1');
}())