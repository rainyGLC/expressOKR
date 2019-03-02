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
    let token = req.body.token;
    let user_id = authCodeFunc(token,'DECODE').split('\t')[2];//解密token
    let surprise = req.body.surprise;//aaa
    let todos =req.body.todos;
    let todosValue =[];//['项目 1', '项目 2', '项目三' ]
    let valuedata = todos.map(data=>{
      return{
        todosValue:todosValue.push(data.value)
      }
    })
    let keyresults=todos[0];
    let keyresult = keyresults.keyresults
    if(!user_id ||!todos ||!surprise){
      res.json({code:0,data:' empty'});
      return
    }
    try{
      const todos = await Todos.insert({surprise,user_id});
      let todos_id = todos[0];
      console.log(todos_id)
      let todosValues = todosValue.map(data=>{
        return{
          todos_id :todos_id,
          value:data
        }  
      })
      const todo = await Todo.insert(todosValues);
      let todoId = todo[0];
      console.log(todoId);
      let keyresultData = keyresult.map(data=>{
        return{
          todo_id:todoId,
          keyresult_id:data
        } 
      })
      const keyresultId = await Todokeyresult.insert(keyresultData);
      res.json({code:200,message:'ok',todos_id:todos_id})
    }catch(e){
      console.log(e)
      res.json({code:200,data:0})
    }
  },
  showTodo:async function(req,res,next){
    try{
      let id = req.params.id;
      const singleTodo = await Todos.selectTodo({id});
      let todosData =[];
      let surprise =singleTodo[0].surprise;
      console.log(surprise);
      singleTodo.forEach(data=>{
        todosData[data.id]={
          id:data.id,
          value:data.value,   
        }
      })
      let todosDatas = Object.values(todosData);
      console.log(todosDatas);
      let sigleData = {
        todos:todosDatas,
        surprise:surprise
      }
      console.log(sigleData);
      res.json({codo:200,data:sigleData})
    }catch(e){
      console.log(e)
      res.json({code:0,data:e})
    }
  },
  editTodes:async function(req,res,next){
    let id = req.params.id;
    let todos = req.body.todos;
    let todo_id = todos[0].id;
    let status = todos[0].status;
    let reflect = req.body.reflect;
    let happiness = req.body.happiness;
    let happiness_id ='';
    let happinessData = happiness.map(data=>{
      return{
        todos_id:id,
        happiness_id:data
      }
    })
    // let happiness_id = happiness[0];
    // console.log(happiness_id);
    console.log(happinessData);
    if(!id || !todos ||!reflect ||!happiness){
      res.json({code:0,data:'empty'});
      return
    }
    try{
      const reflectData = await Todos.update(id,{reflect});
      const statusData = await Todo.update(todo_id,{status});
      // const happinessId = await Userhappiness.insert({happiness_id})
      const happinessId = await Userhappiness.insert(happinessData);
      res.json({code:200,message:'ok'})
    }catch(e){
      console.log(e)
      res.json({code:200,data:0})
    }
  },
  // showTodos:async function(req,res,next){
  //   try{
  //     let token = req.body.token;
  //     console.log(token);
  //     let user_id = authCodeFunc(token,'DECODE').split('\t')[2];
  //     const recordTodos = await Todos.selectTodos({user_id});
  //     console.log(recordTodos);
  //     let recordData = {};
  //     recordTodos.forEach(data=>{
  //       if(recordData[data.id]){
  //         console.log(recordData[data.id])
  //         recordData[data.id].todos.push({
  //           id:data.id,
  //           value:data.value,
  //           status:data.status
  //         })
  //       }else{
  //         recordData[data.id]={
  //           created_at:data.created_at,
  //           surprise:data.surprise,
  //           reflect:data.reflect,
  //           todos:[{id:data.id,value:data.value,status:data.status}]
  //         }
  //       }
  //     })
  //     let recordArr = Object.values(recordData)
  //     res.json({code:200,data:recordArr})
  //   }catch(e){
  //     console.log(e)
  //     res.json({codo:200,data:0})
  //   }
  // }
}
module.exports = todosControll;
