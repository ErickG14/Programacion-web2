const express = require('express');
const app = express();


app.use(express.static('public'));


const port = 3026;


app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
