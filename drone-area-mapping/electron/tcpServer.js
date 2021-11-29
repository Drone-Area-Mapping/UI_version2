const net = require("net");
const port = 1337;

// Create the server
const server = net.createServer();

// Listen to a port defined by the user
server.listen(port, () => console.log(`TCP socket server up and running on port ${port} 🙉`));

// TODO: Add the ondata and onsend properties


