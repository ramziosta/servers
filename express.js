const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to log the request start time
const startTime = (req, res, next) => {
    console.log(`Request ${req.url} ${req.method} started at: ${new Date()}`);
    next();
};

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to handle raw text and HTML
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.text({ type: 'application/javascript' }));

// Custom middleware to handle different content types
app.use((req, res, next) => {
    const contentType = req.headers['content-type'];

    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
        if (contentType === 'application/json' ||
            contentType === 'application/x-www-form-urlencoded' ||
            contentType === 'text/html' ||
            contentType === 'application/javascript') {
            req.body = req.body;
        } else {
            // Unsupported media type
            res.status(415).send('Unsupported Media Type');
            return;
        }
    }

    next();
});

// Route for the home page
app.get('/', startTime, (req, res) => {
    res.status(202).send('<h1>Hello, hello, World!</h1>');
});

// Route for /books
app.get('/books', startTime, (req, res) => {
    res.status(200).send(`${req.url} ${req.method} started at: ${new Date()}`);
});

// Route for /mags with startTime middleware
app.get('/mags', startTime, (req, res) => {
    res.status(200).send(`${req.url} ${req.method} started at: ${new Date()}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error handling request:', err);
    res.status(500).send('Internal Server Error');
    next();
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});