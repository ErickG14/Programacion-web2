const http = require('http');

const port = 3026;

const server = http.createServer((req,res)=>{

res.writeHead(200,{'Content-Type':'text/plain'});
res.end('Hola mundo');


});


server.listen(port,()=>{
    console.log(`servidor:http://127.0.0.1:${port}`)
});
