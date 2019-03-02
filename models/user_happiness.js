const Knex = require('./knex.js');
const TABLE = 'user-happiness';
const Base = require('./base.js');
class Userhappiness extends Base {
  constructor(props ='user-happiness'){
    super(props)
  }
}
module.exports = Userhappiness;