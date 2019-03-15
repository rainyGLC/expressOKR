const TodosModel = require('./../models/todos.js');
const TodoModel = require('./../models/todo.js');
const KeyresultModel = require('./../models/keyresults.js');
const TodokeyresultModel = require('./../models/todo_keyresult.js');
const ObjectivesModel = require('./../models/objectives.js');
const UserhappinessModel = require('./../models/user_happiness.js')
const Objective = new ObjectivesModel();
const Todos = new TodosModel();
const Todo = new TodoModel();
const Keyresult = new KeyresultModel();
const Todokeyresult = new TodokeyresultModel();
const Userhappiness = new UserhappinessModel();
const authCodeFunc = require('./../utils/authCode.js');

const todosControll = {
  insert: async function(req,res,next){
    let token = req.headers['x-csrf-token'];
    console.log(token);
    let user_id = authCodeFunc(token,'DECODE').split('\t')[2];//解密token
    let surprise = req.body.surprise;//aaa
    let todos = req.body.todos;
    let todosValue = [];//['项目 1', '项目 2', '项目三' ]
    let valuedata = todos.map(data=>{
      return{
        todosValue:todosValue.push(data.value)
      }
    })
    let keyresultArr = todos.map(data =>data.keyresults);   
    let keyresults=todos[0];
    let keyresult = keyresults.keyresults;
    if(!user_id ||!todos ||!surprise){
      res.json({code:0,data:' empty'});
      return
    }
    try{
      const todos = await Todos.insert({surprise,user_id});
      let todos_id = todos[0];
      let todosValues = todosValue.map(data=>{
        return{
          todos_id :todos_id,
          value:data
        }  
      })
      const todo = await Todo.insert(todosValues);
      let todoId = todo[0];
      let keyresultData = keyresult.map(data=>{
        return{
          todos_id:todos_id,
          todo_id:todoId,
          keyresult_id:data
        } 
      })
      const keyresultId = await Todokeyresult.insert(keyresultData);
      res.json({code:200,message:'ok',todos_id:todos_id,})
    }catch(e){
      console.log(e)
      res.json({code:200,data:0})
    }
  },
  showTodo:async function(req,res,next){
    try{
      let id = req.params.id;
      console.log(id);
      const singleTodo = await Todos.selectTodo({id});
      let todosData =[];
      let surprise =singleTodo[0].surprise;
      singleTodo.forEach(data=>{
        todosData[data.id]={
          id:data.id,
          value:data.value,   
        }
      })
      let todosDatas = Object.values(todosData);
      let sigleData = {
        todos:todosDatas,
        surprise:surprise
      }
      res.json({code:200,data:sigleData})
    }catch(e){
      console.log(e)
      res.json({code:0,data:e})
    }
  },
  editTodes:async function(req,res,next){
    let id = req.params.id;
    let todos = req.body.todos;
    let reflect = req.body.reflect;
    let happiness = req.body.happiness;//[1,2,3]
    let happiness_id ='';
    let happinessData = happiness.map(data=>{
      return{
        todos_id:id,
        happiness_id:data
      }
    })
    if(!id || !todos ||!reflect ||!happiness){
      res.json({code:0,data:'empty'});
      return
    }
    try{
      const reflectData = await Todos.update(id,{reflect});
      todos.forEach(async(data)=>{
      let todo_id = data.id;
      let status = data.status;
      await Todo.update(todo_id,{status});
      })
      const happinessId = await Userhappiness.insert(happinessData);
      res.json({code:200,message:'ok'})
    }catch(e){
      console.log(e)
      res.json({code:200,data:0})
    }
  },
  showTodos:async function(req,res,next){
    try{
      let token = req.query.tokens;
      console.log(token)
      let user_id = authCodeFunc(token,'DECODE').split('\t')[2];
      let todos = await Todos.select({user_id});
      let todos_id = todos.map( data => data.id);
      let todo = await Todo.selectIn({
        key: 'todos_id',
        value: todos_id
      })
      let todosObj = {}
      todos.forEach((data)=>{
        data.happness = [];
        data.todos = []
        todosObj[data.id] = data
      })
      todo.forEach((data)=>{
        let tmp = {
          id: data.id,
          value: data.value,
          status: data.status
        }
        todosObj[data.todos_id].todos.push(tmp)
      })
      let happiness =  await Userhappiness.selectIn({
        key: 'todos_id',
        value: todos_id
      })
      happiness.forEach(data => {
        todosObj[data.todos_id].happness.push(data.happiness_id)
      })
      let result = Object.values(todosObj);
      result.reverse();
      res.json({code:200, data: result})
    }catch(e){
      console.log(e)
      res.json({code:200,data:0})
    }
  }
}
module.exports = todosControll;
