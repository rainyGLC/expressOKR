var express = require('express');
var router = express.Router();
var csrf = require('./../middlewares/csrf.js');
var userController = require('./../controllers/user.js');
var objectivesControll = require('./../controllers/objectives.js')


router.post('/login',csrf.getToken,userController.login)
router.post('/okr',csrf.getToken,objectivesControll.insert);
//router.get('/okr',csrf.setToken,objectivesControll.show);
// router.get('/okr/:id',csrf.setToken,objectivesControll.showId);



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
