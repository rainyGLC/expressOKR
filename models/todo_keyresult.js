// 引用 基础模型
const Knex = require('./knex.js');
const TABLE = 'todo-keyresult';
const Base = require('./base.js');
class Todokeyresult extends Base {
  constructor(props ='todo-keyresult'){
    super(props)
  }
}
module.exports = Todokeyresult;