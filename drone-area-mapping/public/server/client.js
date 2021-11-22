const net = require("net");

exports.sendCommand = (string) => {
  const client = new net.Socket();
  client.connect(1337, "127.0.0.1", function () {
    console.log("Connected");
    client.write(string);
  });

  client.on("data", (data) => {
    console.log("[client UI] : Received: " + data);
    client.end();
  });

  client.on("close", () => {
    console.log("[client UI] : Connection closed");
  });
};
