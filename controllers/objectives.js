const ObjectivesModel = require('./../models/objectives.js');
const KeyresultModel = require('./../models/keyresults.js');
const Objective = new ObjectivesModel();
const Keyresult = new KeyresultModel();
const authCodeFunc = require('./../utils/authCode.js');

const objectivesController = {
  insert: async function(req,res,next){
    let objective = req.body.objective;
    let deadline = req.body.deadline;
    let token = req.body.token;
    let keyresult = req.body.keyresult;
    console.log(objective,deadline,token,keyresult)
    if(!objective || !deadline || !token || !keyresult){
      res.json({code:0,data:'params empty!'});
      return
    }
    let user_id = authCodeFunc(token,'DECODE').split('\t')[2];//解密token
    try{
      const objectives = await Objective.insert({objective,deadline,user_id});
      let objective_id = objectives[0];
      let insertData = keyresult.map(function(data){
        return {
          objective_id: objective_id,
          keyresult: data
        }
      })
      const keyresults = await Keyresult.insert(insertData)
      res.json({code:200,message:'ok'})
    }catch(e){
      console.log(e)
      res.json({code:0,data:e})
    }
  },
  show:async function(req,res,next){
    try{
      let token = req.query.token;
      let user_id = authCodeFunc(token,'DECODE').split('\t')[2];
      const objectives = await Objective.select({user_id});
      console.log(objectives);
      res.json({code:200,data:objectives})
    }catch(e){
      res.json({code:0,data:e})
    }
  },
  showId:async function(req,res,next){
    try{
      let id = req.query.id;
      console.log(id)
      const objectives = await Objective.selectId({id});
      console.log(objectives);
      res.json({code:200,data:objectives})
    }catch(e){
       console.log(e);
      res.json({code:0,data:e})
    }
  },
  // edit:async function(req,res,next){
  //   let id = req.body.id;
  //   let objective = req.body.objective;
  //   let deadline = req.body.deadline;
  //   let keyresult = req.body.keyresult;
  //   let token = req.body.token;
  //   if(!objective || !deadline ||!token ||!keyresult){
  //     res.json({code:0,data:'params empty!'});
  //     return
  //   }
  //   let user_id = authCodeFunc(token,'DECODE').split('\t')[2];//解密token
  //   try{
  //     const objectives = await Objective.update(user_id,{objective,deadline});
  //     let updateData = keyresult.map(function(data){
  //       return{
  //         objective_id:id,
  //         keyresult:data
  //       }
  //     })
  //     console.log(updateData)
  //     const keyresults = await Keyresult.update(id,{updateData})
  //     res.json({code:200,message:'ok'})
  //   }catch(e){
  //     console.log(e)
  //     res.json({code:0,data:e})
  //   }
  // }
  
}
module.exports = objectivesController;