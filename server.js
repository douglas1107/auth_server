const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end('404 Not Found');
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  } 
  else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const requestData = JSON.parse(body);
      if (req.url === '/api/signup') {
        const userData = `${requestData.email},${requestData.password}\n`;


        fs.appendFile('users.csv', userData, (err) => {
          if (err) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ status: -1, error: 'Error occurred while signing up.' }));
          } else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ status: 1, message: 'User signed up successfully!' }));
          }
        });
      } else if (req.url === '/api/signin') {
        fs.readFile('users.csv', 'utf8', (err, data) => {
          if (err) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ status: -1, error: 'Error occurred while signing in.' }));
            return;
          }
          const users = data.trim().split('\n').map(line => line.split(','));

          const user = users.find(user => user[0] === requestData.email && user[1] === requestData.password);
          if (user) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ status: 1, message: 'Login successful!' }));
          } 
          else {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ status: -1, error: 'Incorrect email or password.' }));
          }
        });
      } 
      else {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ status: -1, error: 'Unauthorized request' }));
      }
    });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
