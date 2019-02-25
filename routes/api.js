var express = require('express');
var router = express.Router();
var cors = require('./../middlewares/cors.js');
var csrf = require('./../middlewares/csrf.js');
var userController = require('./../controllers/user.js');


router.post('/login',csrf.getToken,userController.login)
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
