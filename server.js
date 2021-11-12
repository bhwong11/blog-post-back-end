//require modules
const express = require('express');
const cors = require('cors');

//misc
const PORT = 3000
const app = express();
const url = 'https://api.hatchways.io/assessment/blog/posts'

//middleware
app.use(cors());
app.use(express.json());

app.get('/api/ping',(req,res)=>{
    return res.status(200).json({
        success:true,
    })
})

app.get('/api/posts',(req,res)=>{
    
})

app.listen(3000,()=>{
    console.log(`listening on port ${3000}`)
})