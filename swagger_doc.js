paths={}
const server1={
    url: 'http://localhost:3000/',
    description: 'Local server'
}


story= {

    "properties": {
        "Id": {
            "type": "integer",
            "format": "int64"
        },
        "Date": {
            "type": "string",
            "example": "123"
        },
        "Timestamp": {
            "type": "string",
            "example": "123"
        },
        "ImageTitle": {
            "type": "string",
            "example": "123"
        },
        "Description": {
            "type": "string",
            "example": "123"
        },
        "Author": {
            "type": "string",
            "example": "123"
        },
        "Picture": {
            "type": "string",
            "example": "123"
        },
    },
    "xml": {
        "name": "Pet"
    }
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
        requestBody:{
            required: true,
            content:{
                "application/json":{
                    "schema":story
                }
            }
        },



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