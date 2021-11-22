// const net = require("net");

// (function () {
//   const server = net.createServer(function (socket) {
//     socket.on("end", () => console.log("[server] : Client disconnected 😔"));
//     socket.on("data", (data) => {
//       console.log(`[server] : You sent the following: ${data}`);
//       socket.write(data);
//     });
//     socket.write("[server] : Echo server\r\n");
//   });

//   server.listen(1337, "127.0.0.1");
// })();

// Load the TCP Library
const net = require("net");

// Keep track of the chat clients

// Start a TCP Server
net
  .createServer(function (socket) {
    socket.write(`[server] Client connected\n`);
    broadcast("[global] Connection established\n");

    // Handle incoming messages from clients.
    socket.on("data", function (data) {
      console.log(`[client]: ${data}`);
    });

    socket.on("error", function (e) {
      console.log(e);
    });

    // Send a message to all clients
    function broadcast(message, sender) {
      // Log it to the server output too
      process.stdout.write(message);
    }
  })
  .listen(5000);

// Put a friendly message on the terminal of the server.
console.log("Chat server running at port 5000\n");
