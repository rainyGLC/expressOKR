const UserModel = require('./../models/user.js');
const User = new UserModel();
const authCodeFunc = require('./../utils/authCode.js');

const authController = {
  login:async function(req,res,nex){
    //获取用户名密码参数
     let name = req.body.name;
     let password = req.body.password;
     if(!name || !password){
      res.json({code:0,data:'params empty!'});
      return
     }
     try{
      const users = await User.select({name,password});
      const user = users[0];
      if(user){
        let auth_Code = name + '\t' + password + '\t' + user.id;
        auth_Code = authCodeFunc(auth_Code,'ENCODE');
        res.cookie('ac',auth_Code,{maxAge: 24 * 60 * 60 * 1000, httponly:true});
        res.json({code:200,message:'登录成功!',token:auth_Code})

      }else{
        res.json({code:0,data:{msg:'登录失败，没有此用户'}})
      }
     }catch(e){
      res.json({code:0,data:e})
     }
  }
}
module.exports = authController;

