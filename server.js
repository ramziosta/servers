const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/router');  // Make sure the path matches your project structure
const app = express();

// Sets the ejs configuration
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the routes from the router module
app.use('/', routes);

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