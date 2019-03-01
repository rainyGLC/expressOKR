// 引用 基础模型
const Knex = require('./knex.js');
const TABLE = 'objectives';
const Base = require('./base.js');
class Objectives extends Base {
  constructor(props ='objectives'){
    super(props)
  }
  selectId(params){
    return Knex(TABLE)
      .leftJoin('keyresults','objectives.id','=','keyresults.objective_id')
      .select(
        {id:'objectives.id'},
        'objectives.objective',
        'objectives.deadline',
        {'keyresultId':'keyresults.id'},
        {'keyresult':'keyresults.keyresult'}
      )
      .where({'objectives.id':params.id})
  }
  showAll(params){
    return Knex(TABLE)
    .leftJoin('keyresults','objectives.id','=','keyresults.objective_id').select(
      {id:'objectives.id'},
      'objectives.objective',
      'objectives.deadline',
      {'keyresultId':'keyresults.id'},
      {'keyresult':'keyresults.keyresult'}
    ).where({'objectives.user_id':params.user_id})
  }
 }
module.exports = Objectives;
