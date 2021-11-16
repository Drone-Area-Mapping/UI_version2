const net = require('net');

(function () {
    const server = net.createServer(function (socket) {
        socket.on('end', () => console.log('Client disconnected 😔'));
        socket.on('data', (data) => console.log(`You sent the following: ${data}`));
        socket.write('Echo server\r\n');
    });

    server.listen(1337, '127.0.0.1');
}())

var server = net.createServer(function (c) { //'connection' listener
    console.log('client connected');
    c.on('end', function () {
        console.log('client disconnected');
    });
    c.write('hello\r\n');

    c.on('data', function (data) {
        var read = data.toString();
        console.log(read);
        // var message = c.read();
        // console.log(message);
    })
    // c.pipe(c);
    c.write('Hello back to C++'); // But only if you shut down the server
});