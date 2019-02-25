var express = require('express');
var router = express.Router();
var csrf = require('./../middlewares/csrf.js'); 


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user',function(req,res,next){
  res.render('./users/login.tpl',)
})

module.exports = router;
