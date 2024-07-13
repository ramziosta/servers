const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

//imports the middlewares
const { validationResult, requestTime, createValidation, inputValidation } = require('../middleware/middleware');

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
router.post('/create', requestTime, createValidation, (req, res) => {
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
router.get('/detail', requestTime, (req, res) => {
    const { fileName } = req.query; // Use req.query to get query parameters

    // Check if fileName exists in the query parameters
    if (!fileName) {
        return res.status(400).send('File name is required');
    }

    const filePath = path.join(__dirname, '../data', fileName);
    console.log(`Reading file from path: ${filePath}`);

    // Check if the file exists and is readable
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
            res.render('detail', { fileContent });
        });
    });
});

// Route to update an existing file
router.put('/update', requestTime, inputValidation, (req, res) => {
    const { fileName, newFileContent } = req.body;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const filePath = path.join(__dirname, '../data', fileName);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found.');
    }

    // Update the file content
    fs.writeFile(filePath, newFileContent, (err) => {
        if (err) {
            console.error('Error updating file:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.status(200).send('File updated successfully.');
    });
});

// Route to delete an existing file
router.delete('/delete', requestTime, (req, res) => {
    const { fileName} = req.body;

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const filePath = path.join(__dirname, '../data', fileName);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found.');
    }

    // Delete the file content
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.status(200).send('File deleted successfully.');
    });
});

module.exports = router;