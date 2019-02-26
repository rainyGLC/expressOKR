// 引用 基础模型
const Knex = require('./knex.js');
const TABLE = 'keyresults';
const Base = require('./base.js');
class Keyresults extends Base {
  constructor(props ='keyresults'){
    super(props)
  }
}
module.exports = Keyresults;