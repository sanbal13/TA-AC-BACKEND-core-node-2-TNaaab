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
        if(contentType === 'application/json') {
            var parsedData = JSON.parse(store);
            res.end(JSON.stringify(parsedData));
        } else if(contentType === 'application/x-www-form-urlencoded') {
            parsedData = qs.parse(store);
            res.end(JSON.stringify(parsedData));
        }
    });
}

server.listen(7000, () => {
    console.log('server is listening on port 7000');
});