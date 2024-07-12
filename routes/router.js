const express = require('express');
const path = require('path');
const fs = require('fs');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Middleware to log the request start time
const requestTime = (req, res, next) => {
    console.log(`Request ${req.url} ${req.method} request made on: ${new Date()}`);
    next();
};


const registerValidation = [
    body('fileName', 'File name is required').exists(),
    body('fileContent', 'File content is required').exists()
]

// Route for the home page listing all files
router.get('/', requestTime, (req, res) => {
    fs.readdir(path.join(__dirname, '../data'), (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.render('index', { files: files });
    });
});

// Route to display the create page for creating a new file
router.get('/create', requestTime, (req, res) => {
    res.render('create');
});

// Route to create a new file
router.post('/create', requestTime, registerValidation, (req, res) => {
    const { fileName, fileContent } = req.body;
    const filePath = path.join(__dirname, '../data', fileName);

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check if file already exists
    if (fs.existsSync(filePath)) {
        return res.status(400).send('File already exists! Please rename the file');
    }

    // Write the file to the data directory
    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.status(201).send('File created successfully.');
    });
});

// Route for displaying the file content
router.get('/details', requestTime, (req, res) => {
    const { fileName } = req.query;
    if (!fileName) {
        return res.status(400).send('File name is required');
    }

    const filePath = path.join(__dirname, '../data', fileName);

    // Log the file path for debugging
    console.log(`Reading file from path: ${filePath}`);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK | fs.constants.R_OK, (err) => {
        if (err) {
            console.error('File does not exist or is not readable:', err);
            return res.status(404).send('File not found or not readable');
        }

        // Read the file content
        fs.readFile(filePath, 'utf-8', (err, fileContent) => {
            if (err) {
                console.error('Error reading file:', err);
                return res.status(500).send('Internal Server Error');
            }
            res.render('details', { fileContent });
        });
    });
});

module.exports = router;