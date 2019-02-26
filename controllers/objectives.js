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
      let token = req.body.token;
      let user_id = authCodeFunc(token,'DECODE').split('\t')[2];
      const objectives = await Objective.select({user_id});
      console.log(objectives);
      res.json({code:200,message:'ok'})
    }catch(e){
      res.json({code:0,data:e})
    }
  },
  // showId:async function(req,res,next){

  // }
}
module.exports = objectivesController;