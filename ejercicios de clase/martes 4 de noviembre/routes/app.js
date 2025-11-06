const express = require('express');
const pageRoutes = require("./routes/pages");

const app = express();
app.use('/',pageRoutes);

app.use(express.static('public'));


app.get('/',(req,res)=>{
    res.redirect('/page1');
});

const port = 3026;

 

app.listen(port,()=>{
    console.log(`server: http:localhost:${port}`)
});
