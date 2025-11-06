const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Servidor HTTP: Hola mundo');
});

const PORT = 3025;
server.listen(PORT, () => {
  console.log(`Servidor http escuchando en http://localhost:${PORT}`);
});
