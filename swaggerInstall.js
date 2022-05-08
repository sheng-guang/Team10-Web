
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require('swagger-jsdoc')


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'secret',
            version: '1.0',
            description: `api list`
        }
    },

    apis: ['./routes/*.js']
}
var swaggerJson = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
}
const swaggerSpec = swaggerDoc(options)

var swaggerInstall = function(app) {

    app.get('/swagger.json', swaggerJson);
    app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}
module.exports = swaggerInstall
