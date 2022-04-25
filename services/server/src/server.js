const http = require('http');
const { config } = require('./config');

const requestHandler = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    if (req.url === "/ping") {
        res.writeHead(200);
        res.write(JSON.stringify({ message: 'pong' }));
    } else {
        res.writeHead(404);
    }

    res.end();
};

const { port, host } = config.server;
const server = http.createServer(requestHandler);

server.listen(port, host);
