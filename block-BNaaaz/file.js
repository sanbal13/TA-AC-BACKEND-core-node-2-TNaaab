let http = require('http');
let fs = require('fs');

let server = http.createServer(handleRequest);

function handleRequest(req,res) {
    fs.createReadStream('./readme.txt').pipe(res); 
}

server.listen(4000, () => {
    console.log('server listening on port 4000');
});
