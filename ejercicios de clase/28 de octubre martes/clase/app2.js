const fs = require('node:fs');

const estado = fs.statSync('./carta.txt');

console.log(estado.isFile());
console.log(estado.isDirectory());
console.log(estado.size);