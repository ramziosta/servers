const express = require('express');
const { body, validationResult } = require('express-validator');
const path = require('path')

const router = express.Router();

// Middleware to log the request start time
const requestTime = (req, res, next) => {
    console.log(`Request ${req.url} ${req.method} request made on: ${new Date()}`);
    next();
};

// Route for the home page
router.get('/', requestTime, (req, res) => {
    res.status(202).send('<h1>File Listing Page</h1>');
});

router.get("create", requestTime, (req,res) =>{
    res.status(200).send("File Created");

    // Gets the name of the file from the url
    const fileName = req.query || "newFile"
    const filePath =  path.join(__dirname, 'data', fileName)

    // Check if file already exists
    if (fs.existsSync(filePath)) {
        return res.status(400).send('File already exists! Please rename the file');
    }
})

module.exports = router;