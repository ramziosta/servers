const http = require("http/http");
const url = require('url');

const HTTP_server = http.createServer((req, res) => {
    // Log the request method and URL
    console.log(`🚀 ${req.method} ${req.url}`);
    res.setHeader('Content-Type', 'text/html');

    // Parse the URL to get query parameters
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (req.method === 'POST') {
        let data = [];

        req.on('data', (chunk) => {
            data.push(chunk);
        }).on('end', () => {
            const bodyString = Buffer.concat(data).toString();
            const body = Object.fromEntries(new URLSearchParams(bodyString));

            res.statusCode = 200;
            res.write('<h1>POST Data Received</h1>');
            res.write('<ul>');
            for (const param in body) {
                res.write(`<li>${param}: ${body[param]}</li>`);
            }
            res.write('</ul>');

            // Use query parameters if present
            if (Object.keys(query).length > 0) {
                res.write('<h2>Query Parameters:</h2><ul>');
                for (const param in query) {
                    res.write(`<li>${param}: ${query[param]}</li>`);
                }
                res.write('</ul>');
            }

            res.end('Response end message');
        });
    } else if (req.method === 'GET' && pathname.startsWith('/books')) {
        res.statusCode = 200;

        // Check for a specific book ID
        const bookId = pathname.split('/books/')[1];
        if (bookId) {
            res.write(`<h1>Book ID: ${bookId}</h1>`);
        }

        // Use query parameters if present
        if (Object.keys(query).length > 0) {
            res.write('<h2>Query Parameters:</h2><ul>');
            for (const param in query) {
                res.write(`<li>${param}: ${query[param]}</li>`);
            }
            res.write('</ul>');
        }

        res.end('Response end message');
    } else {
        // Handle other paths
        if (pathname === "/") {
            res.statusCode = 200;
            res.write('<h1 style="color: red;">Home</h1>');
        } else if (pathname === "/about") {
            res.statusCode = 200;
            res.write('<h1>About</h1>');
        } else if (pathname === "/work") {
            res.statusCode = 200;
            res.write('<h1>Work</h1>');
        } else {
            res.statusCode = 404;
            res.write('<h1>404 Page not found</h1>');
        }
        res.end('Response end message');
    }
});

// Start the HTTP_server on port 3000
HTTP_server.listen(3000, () => {
    console.log('🔋 Server running at http://localhost:3000/');
});