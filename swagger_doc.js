paths={}
const server1={
    url: 'http://localhost:3000/',
    description: 'Local server'
}

paths['/story/download']={
    get: {
        summary:"get all stories",
        responses:{
            '200':{
                description:"success"
            }
        }
    }
}

paths['/story/upload']={
    post: {
        summary:"upload one stories",
        responses:{
            '200':{
                description:"success"
            }
        }
    }
}



const re = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'secret',
            version: '1.0',
            description: `api list`
        },
        servers: [server1],
        paths:paths
    },
    apis: ['./routes/*.js']
}
module.exports=re;