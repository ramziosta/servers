const { body, validationResult } = require('express-validator');

// Middleware to log the request start time
const requestTime = (req, res, next) => {
    console.log(`Request ${req.url} ${req.method} request made on: ${new Date()}`);
    next();
};


// Middleware to check if the user entered the file name and the file content for create route
const createValidation = [
    body('fileName', 'File name is required').exists(),
    body('fileContent', 'File content is required').exists()
];

// Middleware to check if the user entered the file name  and the file content
const inputValidation = [
    body('fileName', 'File name is required').exists(),
    body('newFileContent', 'File content is required').notEmpty()
]

module.exports = {
    requestTime,
    createValidation,
    inputValidation,
    validationResult
}