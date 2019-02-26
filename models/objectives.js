// 引用 基础模型
const Knex = require('./knex.js');
const TABLE = 'objectives';
const Base = require('./base.js');
class Objectives extends Base {
  constructor(props ='objectives'){
    super(props)
  }
  // showAll(params){
  //   return Knex(TABLE).select('objectives.id','objective_id')
  // }
  // showAll(params){
  //   return Knex(TABLE).leftJoin('keyresults','objectives.id','=','objective_id')
  //   .select({user_id:'objectives.user_id'},'objectives.id','objectives.objective','objectives.deadline',
  //   {'objective_id':'keyresults.objective_id'},{'keyresult':'keyresults.keyresult'})
  //   .where({'objectives.user_id':params.user_id})
  // }
  // showOwn(params){
  //   return Knex(TABLE).leftJoin('keyresults','objectives.id','=', 'objective_id')
  //   .select('objectives.id','objectives.objective','objectives.deadline',
  //   {'objective_id':'keyresults.objective_id'},{'keyresult':'keyresults.keyresult'})
  //   .where()
  // }
}
module.exports = Objectives;
