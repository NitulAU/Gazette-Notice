const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();
// Static Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
  res.render('index.ejs');
})
//asynchronous request to the remote JSON API and sends the response back to the client as JSON data.
app.get('/notice', async (req, res) => {
  try {
    const noticeData = await fetch('https://www.thegazette.co.uk/all-notices/notice/data.json');
    res.status(200).json(await noticeData.json());
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});
//handles any other requests that are not matched by the other routes, and sends a 404 response.
app.use((req, res) => {
  res.status(404).send('Sorry, URL not found');
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});

 
