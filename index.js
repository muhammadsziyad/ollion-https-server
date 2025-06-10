// server.js (CommonJS version)
const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Read cert and key
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
};

// Create Express app
const app = express();

app.get('/test', (req, res) => {
  res.status(200).send('Hello from node');
});

app.use((req, res) => {
  res.status(404).send('404 not found');
});

// Start HTTPS server
https.createServer(sslOptions, app).listen(4433, () => {
  console.log('HTTPS server running at https://sample-server1234.com:4433');
});
