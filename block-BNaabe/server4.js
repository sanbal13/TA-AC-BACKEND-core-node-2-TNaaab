let http = require('http');
let qs = require('querystring');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
    let store ='';
    let contentType = req.headers['content-type'];
    req.on('data', (chunk) => {
        store += chunk;
    });
    req.on('end', () => {
      if(contentType === 'application/json') {
         var parsedData = JSON.parse(store);
         console.log(parsedData);
         res.setHeader('Content-Type', 'applcation/json');
         res.end(JSON.stringify(parsedData));
      } else if (contentType === 'application/x-www-form-urlencoded') {
        parsedData = qs.parse(store);
        console.log(parsedData);
        res.setHeader('Content-Type', 'applcation/json');
        res.end(JSON.stringify(parsedData));
      }
    });
}

server.listen(9000, () => {
    console.log('server listening on port 9000');
});