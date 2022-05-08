
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require('swagger-jsdoc')


var swaggerJson = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
}
const swaggerSpec = swaggerDoc(require("./swagger_doc"));

var swaggerInstall = function(app) {

    app.get('/swagger.json', swaggerJson);
    app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}
module.exports = swaggerInstall
