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
                "name": "petId",
                "in": "path",
                "description": "ID of pet that needs to be updated",
                "required": true,
                "type": "string"
            },
            {
                "name": "name",
                "in": "formData",
                "description": "Updated name of the pet",
                "required": false,
                "type": "string"
            },
            {
                "name": "status",
                "in": "formData",
                "description": "Updated status of the pet",
                "required": false,
                "type": "string"
            }
        ],

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