//require modules
const express = require('express');
const cors = require('cors');
const fetch = require('cross-fetch');


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

app.get('/api/posts', async(req,res)=>{
    try{
        //get queries
        const tagsRequests = []
        const tags = req.query.tags
        const direction = req.query.direction
        const sortBy = req.query.sortBy

        //check if queries are valid
        const validSortBy = ['id','reads','likes','popularity']
        const validDirection = ['desc','asc']

        if(!tags){
            return res.status(400).json({
                error: 'Tags parameter is required',
            })
        }
        if(sortBy && !validSortBy.includes(sortBy)){
            return res.status(400).json({
                error: 'sortBy parameter is invalid',
            })
        }
        if(direction && !validDirection.includes(direction)){
            return res.status(400).json({
                error: 'sortBy parameter is invalid',
            })
        }

        //make array of request promises
        const tagsQueried = tags.split(',')
        for(let i=0;i<tagsQueried.length;i++){
            tagsRequests.push(fetch(`${url}?tag=${tagsQueried[i].toString()}`))
        }

        //return reponse from array of promises
        const tagsResponses = await Promise.all(tagsRequests)
        const 
        
        //convert to json
        tagsResponsesJSONRequest = tagsResponses.map(data=>data.json())
        const tagsResponsesJSONResponse = await Promise.all(tagsResponsesJSONRequest)

        //combine results into one array
        let result = [];
        for(let postsObject of tagsResponsesJSONResponse){
            result.push(...postsObject.posts)
        }
        //remove duplicates
        let resultStringify = result.map(post=>JSON.stringify(post))
        result = [...new Set(resultStringify)].map(post=>JSON.parse(post))

        //sort by direction and sortBy query params
        if(sortBy){
            
            if(direction){
                if(direction === 'asc'){
                    result = result.sort((a,b)=>a[sortBy]-b[sortBy])
                }
                if(direction === 'desc'){
                    result = result.sort((a,b)=>b[sortBy]-a[sortBy])
                }
            }else{
                result = result.sort((a,b)=>a[sortBy]-b[sortBy])
            }
        }


        return res.status(200).json({
            posts:result,
        })
        
    }catch(error){
        console.log(error)
        return res.status(500).json({
            error,
            status:500,
        })
    }
})

app.listen(3000,()=>{
    console.log(`listening on port ${3000}`)
})

module.exports = app;