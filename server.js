//REFERENCE DOCS: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#server_handshake_response

import crypto from "node:crypto";
import http from "node:http";
import process from "node:process";

const PORT = 5000;
const WS_MAGIC_STRING_KEY = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("<h1>Learning WebSockets</h1>");
});

server.listen(PORT, () => {
  console.log(`Server listening at port => ${PORT}`);
});

server.on("upgrade", onSocketUpgrade);

function onSocketUpgrade(req, socket, head) {
  const { "sec-websocket-key": SOCKET_KEY } = req.headers;
  console.log(`${SOCKET_KEY} connected`);

  const headers = prepareHandShakeHeaders(SOCKET_KEY);

  console.log({ headers });

  socket.write(headers);
  //console.log({ head: req.headers });
}

function prepareHandShakeHeaders(id) {
  const acceptKey = createSocketAccept(id);
  const headers = [
    "HTTP/1.1 101 Switching Protocols",
    "Upgrade: websocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Accept: ${acceptKey}`,
    "",
  ]
    .map((line) => line.concat("\r\n"))
    .join("");

  return headers;
}

function createSocketAccept(id) {
  const shaum = crypto.createHash("sha1");
  shaum.update(id + WS_MAGIC_STRING_KEY);
  return shaum.digest("base64");
}

// error handling to keep server on

[("uncaughtException", "unhandledRejection")].forEach((event) => {
  process.on(event, (err) => {
    console.error(`Something went wrong: ${event}, msg: ${err.stack || err}`);
  });
});
