const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Middleware to log the request start time
const startTime = (req, res, next) => {
    console.log(`Request ${req.url} ${req.method} started at: ${new Date()}`);
    next();
};

// Route for the home page
router.get('/', startTime, (req, res) => {
    res.status(202).send('<h1>Hello, hello, World!</h1>');
});

// Route for /books with a middleware called startTime
router.get('/books', startTime, (req, res) => {
    res.status(200).send(`${req.url} ${req.method} started at: ${new Date()}`);
});

// Route for /mags with startTime middleware
router.get('/mags', startTime, (req, res) => {
    res.status(200).send(`${req.url} ${req.method} started at: ${new Date()}`);
});

// Route for rendering a user page
router.post('/user', (req, res) => {
    const data = { name: 'John', age: 30, hobbies: ["Swimming", "Running", "Hiking"], loggedIn: false };
    res.render('index', { data });
});

// Function to create a user
const createUser = (name, email, age) => {
    console.log('Creating user:', name, email, age);
}

// Validation middleware for the /register route
const registerValidation = [
    body('name', 'Name is required').exists(),
    body('email', 'Invalid email').exists().isEmail(),
    body('birthday').optional().isDate(),
    body('age').optional().isInt()
]

// Route for registering a user
router.post('/register', registerValidation, (req, res) => {
    console.log('POST Data Received');
    console.log(req.body);  // Log the request body to see the incoming data

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, age } = req.body;
    createUser(name, email, age);
    res.status(201).send('User registered successfully');
});

module.exports = router;