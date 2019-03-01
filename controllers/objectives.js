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
      const objectives = await Objective.showAll({user_id});
      let objectivData= {};
      objectives.forEach(data=>{
        if(objectivData[data.id]){
          objectivData[data.id].keyresults.push({
            id:data.keyresultId,
            keyresults:data.keyresult
          })
        }else{
          objectivData[data.id] ={
            id : data.id,
            objective:data.objective,
            deadline:data.deadline,
            keyresults:[{id:data.keyresultId,keyresult:data.keyresult}]
          }
        }
      })
      let objectivArr = Object.values(objectivData);
      return objectivArr;
      console.log(objectivArr);
      res.json({code:200,data:objectivArr})
    }catch(e){
      console.log(e);
      res.json({code:0,data:e})
    }
  },
  showId:async function(req,res,next){
    try{
      let id = req.params.id;
      const objectives = await Objective.selectId({id});
      let objective = '';
      let deadline = '';
      let keyresults = [];
      let keyresultId = '';
      objectives.forEach((data)=>{
        id = id;
        objective = data.objective;
        deadline = data.deadline;
        keyresults.push({id:data.keyresultId,keyresult:data.keyresult})
      })
      let showData = {
        id:id,
        objective:objective,
        deadline:deadline,
        keyresults:keyresults
      }
      res.json({code:200,data:showData})
    }catch(e){
      console.log(e)
      res.json({code:0,data:e})
    }
  },
  edit:async function(req,res,next){
    let id = req.params.id;
    let objective = req.body.objective;
    let deadline = req.body.deadline;
    let keyresults = req.body.keyresults;
    let keyresultId = keyresults[0].id;
    let keyresult = keyresults[0].keyresult;
    if(!objective || !deadline ||!keyresults){
      res.json({code:0,data:'params empty!'});
      return
    }
    try{
      const objectives = await Objective.update(id,{objective,deadline});
      console.log(objectives);
      const keyResult = await Keyresult.update(keyresultId,{keyresult});
      console.log(keyResult);
      res.json({code:200,message:'ok'})
    }catch(e){
      console.log(e)
      res.json({code:0,data:e})
    }
  }
}
module.exports = objectivesController;