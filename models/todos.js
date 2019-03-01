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
} 
module.exports = Todos;