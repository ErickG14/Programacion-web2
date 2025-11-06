const os =require('node:os');

console.log("informacion del:",os.platform());
console.log("versionde mi sistema:" ,os.release());
console.log("arquitectura", os.cpus());