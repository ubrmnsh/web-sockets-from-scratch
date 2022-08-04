import http from "node:http";
import process from "node:process";

const PORT = 5000;

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("<h1>Learning WebSockets</h1>");
});

server.listen(PORT, () => {
  console.log(`Server listening at port => ${PORT}`);
});

server.on("upgrade", (req, socket, head) => {
  const { "sec-websocket-key": SOCKET_KEY } = req.headers;

  console.log(SOCKET_KEY);
  //console.log({ head: req.headers });
});

// error handling

[("uncaughtException", "unhandledRejection")].forEach((e) => {
  process.on(e, (err) => {
    console.error(`Something went wrong: ${e}, msg: ${err.stack || err}`);
  });
});
