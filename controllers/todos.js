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

    let keyresultArr = todos.map(data =>data.keyresults);
    // let keyresultArr = todos.map(data=>{
    //   return {
    //     id:data.id,
    //     keyresults:data.keyresults
    //   }
    // })
    // console.log(keyresultArr);
    // let objectives_id = keyresultArr.map(data=> data.id);
    // console.log(objectives_id);
    // console.log(keyresultArr);    
    let keyresults=todos[0];
    let keyresult = keyresults.keyresults;
    // console.log(keyresults);
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
          // objectives_id:objectives_id
        } 
      })
      console.log(keyresultData);
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
    let happiness = req.body.happiness;//[1,2,3]
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
  showTodos:async function(req,res,next){
    try{
      let token = req.query.token;
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
      console.log(todos);

      todo.forEach((data)=>{
        let tmp = {
          id: data.id,
          value: data.value,
          status: data.status
        }
        console.log(todo);
   
        todosObj[data.todos_id].todos.push(tmp)
      })


      let happiness =  await Userhappiness.selectIn({
        key: 'todos_id',
        value: todos_id
      })
      // console.log(happiness)

      happiness.forEach(data => {
        todosObj[data.todos_id].happness.push(data.happiness_id)
      })
      console.log(happiness);

      let result = Object.values(todosObj)
      res.json({code:200, data: result})
    }catch(e){
      console.log(e)
      res.json({codo:200,data:0})
    }
  }
}
module.exports = todosControll;
