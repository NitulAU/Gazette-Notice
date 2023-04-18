// // server.js
import express from 'express';
import fs from 'fs';
import fetch from 'node-fetch';

const app = express();
app.get('/', (req, res) => {
  fs.readFile('index.html', (err, data) => {
    if (err) {
      res.status(500).send('Internal server error');
      res.end('Internal server error');
    } else {
      // res.status(200).send(data);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);//reads the contents of the index.html file and sends it back to the client as an HTML response.
    }
  });
});
//asynchronous request to the remote JSON API and sends the response back to the client as JSON data.
app.get('/notice', async (req, res) => {
  try {
    const not = await fetch('https://www.thegazette.co.uk/all-notices/notice/data.json');
    const noticeData = await not.json();
    //res.writeHead(200, {'Content-Type': 'application/json'});
    //res.end(JSON.stringify(noticeData));//sends it to the client as a string
    res.status(200).json(noticeData);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});
//handles any other requests that are not matched by the other routes, and sends a 404 response.
app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
 
