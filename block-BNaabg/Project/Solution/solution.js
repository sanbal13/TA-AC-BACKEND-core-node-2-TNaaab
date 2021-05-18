var http = require('http');
var fs = require('fs');
var url = require('url');

var PORT = 3000;
var usersPath = __dirname + `/users/`;

var server = http.createServer(handleRequest);

function handleRequest(req,res) {
    let store = '';
    req.on('data', (chunk) => {
        store += chunk;
    });

    req.on('end', () => {
        let parsedUrl = url.parse(req.url, true);
        // handle all routes
        // Create User
        if(req.url === '/users' && req.method === 'POST') {
            var username = JSON.parse(store).username;
            fs.open(usersPath + username + '.json', 'wx', (err, fd) => {
                if(err) return console.log(err);
                fs.writeFile(fd, store, (err) => {
                  if(err) return console.log(err);  
                  fs.close(fd, (err) => {
                      if(err) return console.log(err);
                      res.end(`${username} created successfully`);
                  });
                });

            }); 
        }
        // Read User  
        else if(parsedUrl.pathname === '/users' && req.method === 'GET') {
                var username = parsedUrl.query.username;
                
                fs.readFile(usersPath + username + '.json', (err, content) => {
                    if(err) return console.log(err);

                    res.setHeader('Content-Type', 'applicationjson');                    
                    res.end(content)
                });
        }
        
        else if(parsedUrl.pathname === '/users' && req.method === 'PUT') {
            var username = parsedUrl.query.username;
            fs.open(usersPath + username +'.json', 'r+', (err, fd) => {
                if(err) return console.log(err);
                fs.ftruncate(fd, (err) => {
                    if(err) return console.log(err);
                }); 
                fs.writeFile(fd, store, (err) => {
                    if(err) return console.log(err);
                    
                    fs.close(fd, () => {
                      res.end(`${username} updated successfully`);
                    });
                });
            })

        }

        else if(parsedUrl.pathname === '/users' && req.method === 'DELETE') {
            var username = parsedUrl.query.username;
            fs.unlink(usersPath + username + '.json', (err) => {
                if(err) return console.log(err);
                res.end(`${username} is deleted.`);
            });

        }
        else {
        res.statusCode = 404;
        res.end('Page Not Found');
        }

    });
}

server.listen(PORT, () => {
    console.log('server is listening on port ' + PORT);
});
