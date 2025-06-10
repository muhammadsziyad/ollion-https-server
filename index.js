const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Load SSL key and certificate
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
};

// Create Express app
const app = express();

// GET /test
app.get('/test', (req, res) => {
  res.send('Hello from GET /test');
});

// GET /test2
app.get('/test2', (req, res) => {
  res.send('Hello from GET /test2');
});

// POST /test
app.post('/test', (req, res) => {
  res.send('Hello from POST /test');
});

// All other routes
app.use((req, res) => {
  res.status(404).send('404 not found');
});

// Start HTTPS server on port 8001
https.createServer(sslOptions, app).listen(8001, () => {
  console.log('HTTPS server running at https://sample-server1234.com:8001');
});
