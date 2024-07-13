
// const express = require('express');
//
//const { body, validationResult } = require('express-validator');
// const bodyParser = require('body-parser');
// const path = require('path');
// const ejs = require('ejs');
// const routes = require('./routes/routes');
// const app = express();

// Sets the ejs configuration
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

//routes
// app.use("/", routes)

// Middleware to log the request start time
// const startTime = (req, res, next) => {
//     console.log(`Request ${req.url} ${req.method} started at: ${new Date()}`);
//     next();
// };

// Middleware to parse JSON and URL-encoded bodies
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Middleware to handle raw text and HTML
// app.use(bodyParser.text({ type: 'text/plain' }));
// app.use(bodyParser.text({ type: 'text/html' }));
// app.use(bodyParser.text({ type: 'application/javascript' }));

// Custom middleware to handle different content types
// app.use((req, res, next) => {
//     const contentType = req.headers['content-type'];
//
//     if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
//         if (contentType === 'application/json' ||
//             contentType === 'application/x-www-form-urlencoded' ||
//             contentType === 'text/html' ||
//             contentType === 'application/javascript') {
//             req.body = req.body;
//         } else {
//             // Unsupported media type
//             res.status(415).send('Unsupported Media Type');
//             return;
//         }
//     }
//
//     next();
// });

// Route for the home page
// app.get('/', startTime, (req, res) => {
//     res.status(202).send('<h1>Hello, hello, World!</h1>');
// });

// Route for /books with a middleware called startTime
// app.get('/books', startTime, (req, res) => {
//     res.status(200).send(`${req.url} ${req.method} started at: ${new Date()}`);
// });

// Route for /mags with startTime middleware
// app.get('/mags', startTime, (req, res) => {
//     res.status(200).send(`${req.url} ${req.method} started at: ${new Date()}`);
// });
//
// app.post('/user', (req, res) => {
//     const data = { name: 'John', age: 30, hobbies: ["Swimming", "Running", "Hiking"], loggedIn: false };
//     res.render('index', { data });
// });
//
// const createUser = (name, email, age) => {
//     console.log('Creating user:', name, email, age);
// }

// const registerValidation = [
//     body('name', 'Name doesn\'t exist').exists(),
//     body('email', 'Invalid email').exists().isEmail(),
//     body('birthday').optional().isDate(),
//     body('age').optional().isInt()
// ]

// app.post('/register', registerValidation, (req, res) => {
//     console.log('POST Data Received');
//     console.log(req.body);  // Log the request body to see the incoming data
//
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//
//     const { name, email, age } = req.body;
//     createUser(name, email, age);
//     res.status(201).send('User registered successfully');
// })

// Error handling middleware
// app.use((err, req, res, next) => {
//     console.error('Error handling request:', err);
//     res.status(500).send('Internal Server Error');
//     next();
// });
//
// // Start the server on port 3000
// const PORT = process.env.PORT || 3000;
//
// const server = app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


