// 引用 基础模型
const Knex = require('./knex.js');
const TABLE = 'todo-keyresult';
const Base = require('./base.js');
class Todokeyresult extends Base {
  constructor(props ='todo-keyresult'){
    super(props)
  }
  joinObjectAndKR(params){
    return Knex(TABLE)
      .leftJoin('keyresults','todo-keyresult.keyresult_id','=','keyresults.id')
      .leftJoin('objectives','keyresults.objective_id','=','objectives.id')
      .select(
        {objectives_id: 'keyresults.objective_id'}, 
        {objectives: 'objectives.objective'},
        {keyresult: 'keyresults.keyresult'}
      )
      .where({'todo-keyresult.todo_id':params.id})
  }
}
module.exports = Todokeyresult;