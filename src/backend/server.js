const http = require('http');

const requestHandler = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.url === "/ping") {
        res.writeHead(200);
        res.write(JSON.stringify({"Message": "PONG"}));
    } else {
        res.writeHead(404);
    }
    res.end()
}

const server = http.createServer(requestHandler);
server.listen(3000);
