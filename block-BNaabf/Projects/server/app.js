let relativePath = '../client/index.js';

let path = require('path');
let absolutePath = path.normalize(__dirname + '/..') + '/client/index.js';
console.log(relativePath);
console.log(absolutePath);


