let path = require('path');

let serverPath = __filename;
let appPath = path.join(__dirname, '/app.js');
let indexPath = './index.html'
let indexAbsolutePath = path.join(__dirname, '/index.html') 

console.log("Absolute path of server.js: " + serverPath);
console.log("Absolute path of app.js: " + appPath);
console.log("Relative path of index.html: " + indexPath);
console.log("Absolute path of index.js: " + indexAbsolutePath);


