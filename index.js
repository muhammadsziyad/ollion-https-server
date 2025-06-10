import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Support __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load SSL cert and key
const options = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
};

// Create HTTPS server
const server = https.createServer(options, (req, res) => {
  if (req.method === 'GET' && req.url === '/get') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello From Node');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

// Start the server
server.listen(4433, () => {
  console.log('HTTPS Server running at https://sample-server1234.com:4433/');
});
