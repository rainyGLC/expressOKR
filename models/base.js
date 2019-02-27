const knex = require('./knex');
class Base {
  constructor(props) {
    this.table = props;
  }
  all(){
    return new Promise((reslove,reject)=>{
      knex(this.table).select().then( res => {
        reslove(res)
      }).catch( err => {
        reject(err)
      })
    })
  }
  select(params) {
    console.log(params);
    return new Promise((reslove,reject)=>{
      knex(this.table).where(params).select()
      .then( res => {
        reslove(res)
      }).catch( err => {
        reject(err)
      })
    })
  }

  insert(params){
    // console.log(params);
    return new Promise((reslove,reject)=>{
      knex(this.table).insert( params )
      .then( res => {
        reslove(res)
      }).catch( err => {
        reject(err)
      })
    })
  }
  update(id, params ){
    console.log(id, params, 'kkkkk');
    return new Promise((reslove,reject)=>{
      knex(this.table).where('id', '=', id).update( params )
      .then( res => {
        reslove(res)
      }).catch( err => {
        reject(err)
      })
    })
  }
  delete(id){
    return new Promise((reslove,reject)=>{
      knex(this.table).where('id', '=', id).del()
      .then( res => {
        reslove(res)
      }).catch( err => {
        reject(err)
      })
    })
  }
}
module.exports = Base;