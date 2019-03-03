var express = require('express');
var router = express.Router();
var userController = require('./../controllers/user.js');
var objectivesControll = require('./../controllers/objectives.js');
var todosControll = require('./../controllers/todos.js');
var todokrControll = require('./../controllers/todokr.js')


router.post('/login',userController.login);
router.post('/okr',objectivesControll.insert);
router.get('/okr',objectivesControll.show);
router.get('/okr/:id',objectivesControll.showId);
router.put('/okr/:id',objectivesControll.edit);


router.post('/todos',todosControll.insert);
router.get('/todos/:id',todosControll.showTodo);
router.post('/todos/:id',todosControll.editTodes)
router.get('/todos',todosControll.showTodos);

router.get('/todo-kr/:id',todokrControll.check);



// router.get('/todos',function(req,res,next){
//   res.json({code:200})
// });


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource2');
// });

module.exports = router;
