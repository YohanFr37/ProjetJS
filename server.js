// content of index.js
/*
var http = require('http');
var fs = require('fs'); // FileSystem to read the HTML file

const port=8080; // Port the server wil be listening on

fs.readFile('./index.html', function (error, html) {

    if (error) throw error;    

    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  // Load the HTML file
        response.end();  
    }).listen(port, (error) => { // Listen on the specified port
      if (error) {
        return console.log('something bad happened', error)
      }
      console.log(`server is listening on ${port}`)
    })
});
*/
/*

const http = require('http')
const port = 8080 // Listening port for the server

const requestHandler = (request, response) => {
  console.log(request.url)
  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  response.write("yo")
  response.end()
}

const server = http.createServer(requestHandler)

server.listen(port, (error) => {
  if (error) {
    return console.log('something bad happened', error)
  }
  console.log(`server is listening on ${port}`)
})

*/