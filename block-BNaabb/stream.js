let http = require('http');
const PORT = 3456;

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
    let store = '';
    req.on('data', (chunk) => {
        store = store + chunk;
    });
    req.on('end', () => {
        console.log(store);
        res.write(store);
        res.end('\nData received');
    });
    
}

server.listen(PORT, () => {
    console.log('server listening on port ' + PORT);
});