let http = require('http');
let PORT = 5678;
let fs = require('fs');
let qs = require('querystring');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
    if(req.method === 'GET' && req.url === '/form') {
        fs.createReadStream('./form.html').pipe(res);
    } else if(req.method === 'POST' && req.url === '/form') {
        let store = '';
        req.on('data', (chunk) => {
            store += chunk;
        });
        req.on('end', () => {
            let parsedData = qs.parse(store);
            console.log(parsedData);
            res.writeHead(201, {'Content-Type': 'text/html'});
            res.write(`<h2>Name: ${parsedData.name}</h2>`);
            res.write(`<p>Email: ${parsedData.email}</p>`);
            res.write(`<p>Age: ${parsedData.age}</p>`);
            res.end();
        });
    }    
    
}

server.listen(PORT, () => {
    console.log('server is listening on port ' + PORT);
});