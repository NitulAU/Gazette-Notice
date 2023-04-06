// server.js

import http from 'http';
import fs from 'fs';
import fetch from 'node-fetch';

const server = http.createServer((req, res) => { // request listener function
  if (req.url === '/' && req.method === 'GET') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal server error');
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
        //it reads the contents of the index.html file and sends it back to the client as an HTML response.
      }
    });
  } else if (req.url === '/notice' && req.method === 'GET') {
    (async () => {
      const not = await fetch("https://www.thegazette.co.uk/all-notices/notice/data.json");//asynchronously fetches data from a remote JSON API
      const noticeData = await not.json();
      const data = noticeData['entry'];
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(data));//sends it back to the client as a JSON response
    })();
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
