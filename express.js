const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Middleware to handle raw text and HTML
app.use(bodyParser.text({type: 'text/plain'}));
app.use(bodyParser.text({type: 'text/html'}));
app.use(bodyParser.text({type: "application/javascript"}));

// Custom middleware to handle different content types
app.use((req, res, next) => {
    const contentType = req.headers['content-type'];

    if (contentType === 'application/json' || contentType === 'application/x-www-form-urlencoded' || contentType === 'text/html' || contentType === 'application/javascript') {
        req.body = req.body;
    } else {
        // Unsupported media type
        res.status(415).send('Unsupported Media Type');
        return;
    }
    next();
})
;

app.get('/', (req, res) => {
    res.status(202).send('<h1>Hello, hello, World!</h1>');
});

app.post('/books', (req, res) => {
    res.status(303).send('See Other');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});