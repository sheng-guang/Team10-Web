var express = require('express');
var router = express.Router();

/**
 * @swagger
 *  /users:
 *   get:
 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
