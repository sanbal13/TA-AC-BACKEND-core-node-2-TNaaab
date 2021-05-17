let http = require('http');
let qs = require('querystring');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
    let store = '';
    let contentType = req.headers['content-type']
    req.on('data', (chunk) => {
        store += chunk;
    });    
    req.on('end', () => {
        if(req.method === 'POST' && req.url === '/json') {
            console.log(store);
             res.setHeader('Content-Type', 'application/json');
             res.end(store);
        } else if(req.method === 'POST' && req.url === '/form') {
            var parsedData = qs.parse(store);
            console.log(parsedData);
             res.setHeader('Content-Type', 'application/json');
             res.end(JSON.stringify(parsedData));
        }
    });
}

server.listen(7000, () => {
    console.log('server is listening on port 7000');
});