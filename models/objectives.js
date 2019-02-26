// 引用 基础模型
const Knex = require('./knex.js');
const TABLE = 'objectives';
const Base = require('./base.js');
class Objectives extends Base {
  constructor(props ='objectives'){
    super(props)
  }
  showAll(){
    return Knex(TABLE).leftJoin('keyresults','objectives.id','=','objective_id')
    .select('objectives.id', 'objectives.objective','objectives.deadline',
    {'objective_id':'keyresults.objective_id'},{'keyresult':'keyresults.keyresult'})
  }
  // showOwn(params){
  //   return Knex(TABLE).leftJoin('keyresults','objectives.id','=', 'objective_id')
  //   .select('objectives.id','objectives.objective','objectives.deadline',
  //   {'objective_id':'keyresults.objective_id'},{'keyresult':'keyresults.keyresult'})
  //   .where()
  // }
}
module.exports = Objectives;
