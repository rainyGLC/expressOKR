const knex = require('./../models/knex');
const TABLE = 'users';

const User = {
  all(){
    return new Promise((reslove,reject)=>{
      knex(TABLE).select().then( res => {
        reslove(res)
      }).catch( err => {
        reject(err)
      })
    })
  },
  select(params){
    return new Promise((reslove,reject)=>{
      knex(TABLE).select().where(params).then(res=>{
        reslove(res)
      }).catch(err=>{
        reject(err)
      })
    })
  }
}
module.exports = User