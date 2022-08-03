import process from "node:process"
import http from "node:http"

const PORT = 5000;

const app = http.createServer((req,res) => {
  res.writeHead(200);
  res.end('<h1>Learning WebSockets</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening at port => ${PORT}`)
})
