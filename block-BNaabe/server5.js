let http = require('http');
const PORT = 8000;
let server = http.createServer(handleRequest);

function handleRequest(req, res) {
    let store = "";
    req.on('data', (chunk) => {
        store += chunk;
    });
    req.on('end', () => {
        let parsedData = JSON.parse(store);
        res.writeHead(201, {'Content-Type' : 'text/html'});
        res.write(`<h1> Name: ${parsedData.name} </h1>`);
        res.write(`<h2> Email: ${parsedData.email} </h2>`);
        res.end();
    });

}

server.listen(PORT, () => {
    console.log('server listening on port ' + PORT);
});