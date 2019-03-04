const KeyresultModel = require('./../models/keyresults.js');
const TodokeyresultModel = require('./../models/todo_keyresult.js');
const ObjectivesModel = require('./../models/objectives.js');
const Keyresult = new KeyresultModel();
const Todokeyresult = new TodokeyresultModel();
const Objective = new ObjectivesModel();

const todokrControll = {
  check:async function(req,res,next){
    try{
      let id = req.params.id;
      let todokeyresult = await Todokeyresult.joinObjectAndKR({id});
      console.log(todokeyresult);
      let todokeyresultTemp = {};
      todokeyresult.forEach(data=>{
        if(todokeyresultTemp[data.objectives_id]){
          todokeyresultTemp[data.objectives_id].keyresults.push(data.keyresult)
        }else{
          todokeyresultTemp[data.objectives_id] ={
            objectives:data.objectives,
            keyresults:[data.keyresult]
          }
        }
      })
      let todokeyresultShow = Object.values(todokeyresultTemp);
      console.log(todokeyresultShow);
      res.json({code:200,data:todokeyresultShow})
    }catch(e){
      console.log(e)
      res.json({code:0,data:e})
    }
  }
}
module.exports = todokrControll;