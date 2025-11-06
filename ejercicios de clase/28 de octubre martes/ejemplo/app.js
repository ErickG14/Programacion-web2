const express = require('express');

const app = express();

app.get('/',(req,res)=>{

    res.send("Hola mundo")
});



const port = 3025;
app.listen(port,()=>
{
    console.log(`server: http://localhost:${port}`)
})