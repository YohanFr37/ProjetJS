// content of index.js
const http = require('http')
const port = 8080

const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello World')
}

const server = http.createServer(requestHandler)

server.listen(port, (error) => {
  if (error) {
    return console.log('something bad happened', error)
  }

  console.log(`server is listening on ${port}`)
})