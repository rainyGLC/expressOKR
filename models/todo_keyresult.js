// 引用 基础模型
const Knex = require('./knex.js');
const TABLE = 'todo-keyresult';
const Base = require('./base.js');
class Todokeyresult extends Base {
  constructor(props ='todo-keyresult'){
    super(props)
  }
  selectId(params){
    return Knex(TABLE)
      .leftJoin('todo','todo-keyresult.todo_id','=','todo.id')
      .select(
        'todo-keyresult.id',
        'todo-keyresult.todo_id',
        'todo-keyresult.objectivers_id',
        'todo-keyresult.keyresult_id'
      )
      .where({'todo.id':params.id})
  }
}
module.exports = Todokeyresult;