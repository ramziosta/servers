const http = require('http/http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

// Function to handle JSON data
const handleJsonData = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const parsedBody = JSON.parse(body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(parsedBody));
    });
};

// Function to handle URL-encoded data
const handleUrlencodedData = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const parsedBody = querystring.parse(body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(parsedBody));
    });
};

// Function to handle file uploads (multipart/form-data)
const handleMultipartData = (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, 'uploads');
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'File upload error' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ fields, files }));
    });
};

// Create server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const headers = req.headers;

    if (method === 'POST') {
        if (headers['content-type'] === 'application/json') {
            handleJsonData(req, res);
        } else if (headers['content-type'] === 'application/x-www-form-urlencoded') {
            handleUrlencodedData(req, res);
        } else if (headers['content-type'] && headers['content-type'].includes('multipart/form-data')) {
            handleMultipartData(req, res);
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Unsupported content type');
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method not allowed');
    }
});

// Create uploads directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
    fs.mkdirSync(path.join(__dirname, 'uploads'));
}

// Start server
server.listen(3000, () => {
    console.log('Server running at http://127.0.0.1:3000/');
});