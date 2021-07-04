var http = require('http');

http.createServer(function (req, res) {
  res.write("I'm alive\n");
  res.write("Would you like some cookies?");
  res.end();
}).listen(8080);