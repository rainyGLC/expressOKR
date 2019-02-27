// 引用 基础模型
const Knex = require('./knex.js');
const TABLE = 'objectives';
const Base = require('./base.js');
class Objectives extends Base {
  constructor(props ='objectives'){
    super(props)
  }
  selectId(params){
    return Knex(TABLE).leftJoin('keyresults','objectives.id','=','objective_id')
    .select({id:'objectives.id'},'objectives.objective','objectives.deadline',
    {'objective_id':'keyresults.objective_id'},{'keyresult':'keyresults.keyresult'})
    .where({'objectives.id':params.id})
  }
}
module.exports = Objectives;
