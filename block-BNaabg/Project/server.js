let http = require('http');
let PORT = 8000;
let fs = require('fs');
let url = require('url');
let path = require('path');
const userDir = path.join(__dirname, "/users/");

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
    let store = '';
    let pathname = url.parse(req.url).pathname;
    console.log(pathname);

    req.on('data', (chunk) => {
       store += chunk;
    }).on('end', () => {
        if(req.method === 'POST' && req.url === '/users') {
                var username = JSON.parse(store).username;
                fs.open(userDir + username + '.json', 'wx', (err, fd) => {
                    if(err)  console.log(err);
                    fs.writeFile(fd, store, (err) => {
                        if(err)  console.log(err);
                    fs.close(fd, (err) => {
                        if(err)  console.log(err);
                        res.end(`${username} successfully created`);
                    });    
                    });
                });
        } else if(req.method === 'GET' && pathname === '/users') {
            let username = url.parse(req.url, true).query.username;
            res.setHeader('Content-Type', 'application/json')
            fs.createReadStream(__dirname+'/users/'+username+ '.json').pipe(res);

        } else if(req.method === 'PUT' && pathname === '/users') {
                var username = JSON.parse(store).username;
                fs.open(userDir + username +'.json', 'r+',(err, fd) => {
                    if(err) console.log(err);
                    fs.ftruncate();
                    fs.writeFile(fd, store, (err) => {
                        if(err) console.log(err);
                    fs.close(fd, (err) => {
                        if(err) console.log(err);
                        res.end('${username} sucessfully created');
                    });    
                    })
                })
        } else if(req.method === 'DELETE' && pathname === '/users') {
        let username = url.parse(req.url, true).query.username;  
        let delFile = __dirname + '/users/'+username+'.json';
        fs.unlink(delFile, (err) => {
            if(err) console.log(err);
            else {
                console.log("file deleted");
                res.end("User deleted");
            }
        });
          
        } else {
            res.setCode =404;
            res.end("Page not found");
        }
    });

}

server.listen(PORT, () => {
    console.log('server is listening on port ' + PORT);
});