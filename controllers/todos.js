const TodosModel = require('./../models/todos.js');
const TodoModel = require('./../models/todo.js');
const KeyresultModel = require('./../models/keyresults.js');
const TodokeyresultModel = require('./../models/todo_keyresult.js');
const ObjectivesModel = require('./../models/objectives.js');
const Objective = new ObjectivesModel();
const Todos = new TodosModel();
const Todo = new TodoModel();
const Keyresult = new KeyresultModel();
const Todokeyresult = new TodokeyresultModel();
const authCodeFunc = require('./../utils/authCode.js');

const todosControll = {
  insert: async function(req,res,next){
    let token = req.body.token;
    let user_id = authCodeFunc(token,'DECODE').split('\t')[2];//解密token
    console.log(user_id);//1
    let surprise = req.body.surprise;//aaa
    console.log(surprise);
    let todos =req.body.todos;
    console.log(todos);
    let todosValue =[];//['项目 1', '项目 2', '项目三' ]
    let valuedata = todos.map(data=>{
      return{
        todosValue:todosValue.push(data.value)
      }
    })
    console.log(todosValue)
    let keyresults=todos[0];
    console.log(keyresults);
    let keyresult = keyresults.keyresults
    console.log(keyresult);
    if(!user_id ||!todos){
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
      console.log(todosValues);
      const todo = await Todo.insert(todosValues);
      let todoId = todo[0];
      let keyresultData = keyresult.map(data=>{
        return{
          todo_id:todoId,
          keyresult_id:data
        } 
      })
      const keyresultId = await Todokeyresult.insert(keyresultData);
      console.log(keyresultData);
      res.json({code:200,message:'ok'})
      
    }catch(e){
      console.log(e)
      res.json({code:200,data:0})
    }
  },
  // showTodo:async function(req,res,next){
  //   try{
  //     let id = req.params.id;
  //     const singleTodo = await Todos.selectTodo({id});
  //     let todosData =[];
  //     let todos ={};
  //     let surprise = '';
  //     singleTodo.forEach(data=>{
  //       todosData[data.id]={
  //         id:data.id,
  //         value:data.value,
  //         surprise:data.surprise
  //       },
  //     )
  //     let singleData ={
  //       todos:{todosData,surprise:surprise}
  //     }
  //     console.log(singleTodo);
  //     console.log(singleData);
  //     res.json({codo:200,data:todos})
  //   }catch(e){
  //     console.log(e)
  //     res.json({code:0,data:e})
  //   }
  // }

}
module.exports = todosControll;
