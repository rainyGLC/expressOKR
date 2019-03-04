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
      .leftJoin('')
      .select(
        'todo-keyresult.id',
        'todo-keyresult.todo_id',
        'todo-keyresult.objectivers_id',
        'todo-keyresult.keyresult_id'
      )
      .where({'todo.id':params.id})
  }

  joinObjectAndKR(params){
    return Knex(TABLE)
      .leftJoin('objectives','todo-keyresult.objectivers_id','=','objectives.id')
      .leftJoin('keyresults','todo-keyresult.keyresult_id','=','keyresults.id')
      .select(
        {objectives_id: 'objectives.id'}, 
        {objectives: 'objectives.objective'},
        {keyresult: 'keyresults.keyresult'}
      )
      .where({'todo-keyresult.todo_id':params.id})
  }
}
module.exports = Todokeyresult;