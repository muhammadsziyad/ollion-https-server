import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SSL certificate and key
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
};

// Initialize Express app
const app = express();

// Define GET /test route
app.get('/test', (req, res) => {
  res.status(200).send('Hello from node');
});

// Handle all other routes
app.use((req, res) => {
  res.status(404).send('404 not found');
});

// Create HTTPS server
https.createServer(sslOptions, app).listen(4433, () => {
  console.log('HTTPS server is running at https://sample-server1234.com:4433');
});
