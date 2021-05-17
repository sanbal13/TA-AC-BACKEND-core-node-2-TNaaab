let http = require('http');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
    let store ='';
    req.on('data', (chunk) => {
        store += chunk;
    });
    req.on('end', () => {
      if(req.method ==='POST' && req.url === '/') {
          res.statusCode = 201;
          res.setHeader('Content-Type', 'application/json');
          let parsedData = JSON.parse(store);
          console.log(parsedData);
          res.end(JSON.stringify(parsedData));
      }
    });
}

server.listen(5000, () => {
    console.log('server listening on port 5000');
});