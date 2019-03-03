const TodosModel = require('./../models/todos.js');
const TodoModel = require('./../models/todo.js');
const KeyresultModel = require('./../models/keyresults.js');
const TodokeyresultModel = require('./../models/todo_keyresult.js');
const ObjectivesModel = require('./../models/objectives.js');
const UserhappinessModel = require('./../models/user_happiness.js');
const Objective = new ObjectivesModel();
const Todos = new TodosModel();
const Todo = new TodoModel();
const Keyresult = new KeyresultModel();
const Todokeyresult = new TodokeyresultModel();
const Userhappiness = new UserhappinessModel();
const authCodeFunc = require('./../utils/authCode.js');


const todokrControll = {
  check:async function(req,res,next){
    try{
      let id = req.params.id;
      let todokeyresult = await Todokeyresult.selectId({id});
      console.log(todokeyresult);
      
      res.json({code:200,message:'ok'})
    }catch(e){
      console.log(e)
      res.json({code:0,data:e})
    }
  }
}
module.exports = todokrControll;