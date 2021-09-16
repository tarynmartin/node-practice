var http = require("http");
// Node.js has a built-in module called HTTP, which allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP).
var url = require("url");
const fs = require("fs");

// modules are the same as libraries
// use require like above to import a module
/* 
put your own modules/functions in another file and import into file needed
exports.myDateTime = function () {
  return Date();
};

- Use the exports keyword to make properties and methods available outside the module file.

call in file like so:

var dt = require('./myfirstmodule');
*/

// const http = require("http");

// const port = process.env.PORT;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/html");
//   res.end("<h1>Hello, World!</h1>");
// });

// server.listen(port, () => {
//   console.log(`Server running at port ${port}`);
// });

//The HTTP module can create an HTTP server that listens to server ports and gives a response back to the client.

// Use the createServer() method to create an HTTP server:
// The function passed into the http.createServer() method, will be executed when someone tries to access the computer on port 8080.

// The function passed into the http.createServer() has a req argument that represents the request from the client, as an object (http.IncomingMessage object).

// This object has a property called "url" which holds the part of the url that comes after the domain name:

http
  .createServer(function (req, res) {
    // If the response from the HTTP server is supposed to be displayed as HTML, you should include an HTTP header with the correct content type
    // The first argument of the res.writeHead() method is the status code, 200 means that all is OK, the second argument is an object containing the response headers.
    const q = url.parse(req.url, true);
    const filename = '.' + q.pathname + '.html'; 
    console.log('here', q.pathname, filename);
    if (q.pathname === '/about' || q.pathname === '/contact-me') {
      fs.readFile(filename, (err, data) => {
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          return res.end("404 Not Found");
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      })
    } else if (q.pathname === '/') {
      fs.readFile('./index.html', (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
      })
    } else {
      fs.readFile('./404.html', (err, data) => {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
      })
    }
  })
  .listen(8080);


  // should take user to index.html
  // localhost:8080/about to about.html
  // localhost:8080/contact-me to contact-me.html
  // 404.html should show everywhere else