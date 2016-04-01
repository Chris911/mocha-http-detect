const http = require('http');

const server = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, world!\n');
});

exports.listen = function(port) {
  server.listen(port);
};

exports.close = function(done) {
  server.close(done);
};
