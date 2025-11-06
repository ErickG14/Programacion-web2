const express = require('express');

const path = require('path');


const router = express.Router();

router.get('/page1',(req,res)=>{
    res.sendFile(path.join(_dirname,'../public','/page1.html'))
});

router.get('/page2',(req,res)=>{
    res.sendFile(path.join(_dirname,'../public','/page2.html'))
});



module.export = router;