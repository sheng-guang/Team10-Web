paths={}
const server1={
    url: 'http://localhost:3000/',
    description: 'Local server'
}

paths['/story/download']={
    post: {
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
        },
        parameters:[
            {
                "in": "body",
                "name": "body",
                "description": "task object",
                "required": true,
                "schema": {
                    "type": "object",
                    "properties": {
                        // "Id" : {
                        //     "type": "object",
                        //     "$ref": "#/definitions/Task"
                        // },
                        "Id":{},
                        "Date":{},
                        "Timestamp":{},
                        "ImageTitle":{},
                        "Description":{},
                        "Author":{},
                        "Picture":{}

                    }
                }
            }
        ]

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