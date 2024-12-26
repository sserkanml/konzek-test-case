const http = require('http');
const morgan = require('morgan');
const finalhandler = require('finalhandler');

// Create a Morgan logger
const logger = morgan('dev');

// Server configuration
const port = 3000;

// Create the HTTP server
const server = http.createServer((req, res) => {
  // Use Morgan middleware to log requests
  logger(req, res, (err) => {
    if (err) {
      // Handle Morgan errors
      res.statusCode = 500;
      res.end('Internal Server Error');
      return;
    }

    // Handle other routes or requests
    if (req.url === '/') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello, World!\n');
    } else {
      // Handle 404 responses
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not Found\n');
    }
  });
});

// Start the server
server.listen(port, '0.0.0.0', () => {
  console.log(`Server running at port http://localhost:${port}/`);
});
