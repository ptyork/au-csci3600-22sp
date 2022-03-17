const http = require('http');

const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((req, res) => {
    console.log('HEADERS:');
    console.log(req.headers);
    console.log('METHOD:');
    console.log(req.method);
    console.log('URL:');
    console.log(req.url);

    switch (req.url) {
        case '/':
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end('<h1>HOME PAGE</h1>');
        default:
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<h1>File Not Found</h1>');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
