const express = require('express');
//! const bodyParser = require('body-parser'); use express middleware instead
const path = require('path');

const app = express();

// Sets the ejs configuration
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//! Middleware to parse JSON and URL-encoded bodies using body-parser
//! app.use(bodyParser.json());
//! app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the routes from the router module
const router = require('./routes/router');
app.use('/', router);

//Using static files
app.use(express.static(path.join(__dirname, 'public')));


// Express internal error handling middleware, not using body-parser
app.use((err, req, res, next) => {
    console.error('Error handling request:', err);
    res.status(500).send('Internal Server Error');
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});