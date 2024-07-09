const http = require("http");
const url = require('url');

const server = http.createServer((req, res) => {
    // Log the request method and URL
    console.log(`🚀 ${req.method} ${req.url}`);
    res.setHeader('Content-Type', 'text/html');

    // Parse the URL to get query parameters
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;
    const filePath = pathname.substring(1);

    // Set the response status code and headers
    if (pathname === "/") {
        res.statusCode = 200;
        res.write('<h1 style="color: red;">Home</h1>');
        res.write(`\n${req.url}\n`);
    } else if (pathname === "/about") {
        res.statusCode = 200;
        res.write('<h1>About</h1>');
        res.write(`\n${req.url}\n`);
    } else if (pathname === "/work") {
        res.statusCode = 200;
        res.write('<h1>Work</h1>');
        res.write(`\n${req.url}\n`);
    } else if (req.method === 'GET') {
        res.statusCode = 200;
        res.write(`<h1>Requested Path: ${filePath}</h1>`);
        res.write(`\n${req.url}\n`);

        // Use query parameters if present
        if (Object.keys(query).length > 0) {
            res.write('<h2>Query Parameters:</h2><ul>');
            for (const param in query) {
                res.write(`<li>${param}: ${query[param]}</li>`);
            }
            res.write('</ul>');
        }
    } else {
        res.statusCode = 404;
        res.write('<h1>404 Page not found</h1>');
    }

    // Send the response body and end the response
    res.end('Response end message');
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('🔋 Server running at http://localhost:3000/');
});