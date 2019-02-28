const Knex = require('./knex.js');
const TABLE = 'todos';
const Base = require('./base.js');
class Todos extends Base {
  constructor(props ='todos'){
    super(props)
  }
}
module.exports = Todos;