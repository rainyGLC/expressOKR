const Knex = require('./knex.js');
const TABLE = 'todos';
const Base = require('./base.js');
class Todos extends Base {
  constructor(props ='todos'){
    super(props)
  }
  selectTodo(params){
    return Knex(TABLE)
    .leftJoin('todo','todos.id','=','todo.todos_id')
    .select(
      'todos.surprise',
      {'id':'todo.id'},
      {'value':'todo.value'}
    )
    .where({'todos.id':params.id})
  }
  selectTodos(params){
    return Knex(TABLE)
    .leftJoin('todo','todos.id','=','todos_id')
    .select(
      'todos.created_at',
      {'id':'todo.id'},
      {'value':'todo.value'},
      {'status':'todo.status'},
      'todos.status',
      'todos.reflect'
    )
    .where({'todos.id':params.id})
  }
  selectHappy(params){
    return Knex(TABLE)
    .leftJoin('user-happiness','todos.id','=','user-happiness.todos_id')
    .select(
      ''

    )
  }
} 
module.exports = Todos;