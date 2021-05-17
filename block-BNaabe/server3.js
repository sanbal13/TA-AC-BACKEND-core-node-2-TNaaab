let http = require('http');
let qs = require('querystring');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
    let store ='';
    req.on('data', (chunk) => {
        store += chunk;
    });
    req.on('end', () => {
      if(req.method ==='POST' && req.url === '/') {
          res.statusCode = 201;
          res.setHeader('Content-Type', 'text/plain');
          let parsedData = qs.parse(store);
          console.log(parsedData);
          res.end(parsedData.captain);
      }
    });
}

server.listen(5000, () => {
    console.log('server listening on port 5000');
});