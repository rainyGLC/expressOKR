    
    在这一周做探月计划的后台任务时，结果在既定时间里超出了好几天，问题主要出现在：

    1 在做任务之前，第一个考虑的事情就是数据库的设计，有多少个模块，但是自己并没有很好的理解数据之间怎么关联，导致在后面写相关接口时还在思考数据之间的关联

    2 没有及时跟前端沟通和很好的表达后台想要的数据和前端接收的数据，导致任务进度变慢，浪费不必要的时间

    3 分不清req.body和req.query的用法，纠正好几次还是会写错，

    nodejs取参req.body,req.query,req.params
    req.body:解析body不是nodejs默认提供的，需要载入body-parser中间件才可以使用req.body ,req.body是用在post请求中
    eg:router.post('/login',function(req,res,next){
      var name = req.body.name
      var pass = req.body.password;
      console.log('name'+ name);
      console.log('pass' +pass);
      if(name =="ooo" && pass == 1){
        res.send('1')
      }
      res.end('is over')
      })

    req.query: 此方法多适用于GET请求，解析GET里的参数
    eg:所对应的url长这个样子http://localhost:3000/?id=10
    也就是说是问号后面的
    app.get('/',function(req,res){
      res.send(req.query["id"])
      })

    req.params 所对应的url长这个样子 http://localhost:3000/10
    eg:app.get('/:id'.function(req,res){
      res.send(req.params["id"])
      });
    req.params:多适用于restful风格url中的参数的解析／也可以用在get请求中


    response的扩展函数:如res.send()发送字符串、res.sendFile()发送文件、
    res.json({})响应json对象
    通过request获取请求数据，如req.method获取请求方式、req.path获取请求路径、
    req.ip获取请求方ip


    4 数据之前的合并，重组，去重处理能力太弱，思考一天的时间也写不出来，遇到这些问题应先撸清这个数据之间的逻辑关系，动手之前先写出逻辑关系

    5 在遇到类似在添加todos的todo三件事时同时把objective_id和keyresult_id添加到todo-keyresult表中，在拿不到objective_id这个字段到数据时应该灵活的转换思路，不要钻牛角尖

    6 数据库的字段名要对应每一张的字段，命名要注意规范

    7.要以项目的完成需求为主，遇到不会的问题，自己在查找了方法解决不了的情况下要及时寻找帮助

    用express框架构建探月okr需求：
    1.使用 express-generator 快速搭建项目框架
    2.使用 axios 请求第三方接口
    3.使用 cors 允许跨域请求
    4.使用 knex 增删改查数据库
    eg:selectIn(params) {
      return new Promise((reslove,reject)=>{
        knex(this.table).whereIn(params.key,params.value).select()
        .then( res => {
          reslove(res)
        }).catch( err => {
          reject(err)
        })
      })
    }

    let todosValues = todosValue.map(data=>{
        return{
          todos_id :todos_id,
          value:data
        }  
      })
    whereIn的用法

    5.使用 Base 公共模型优化
    7.使用 cookie 完成登录权限控制

    let date = Date.now();
    let odate = new Date(data.deadline).getTime();
        return odate > date
      })
     筛选出截止时间大于当前时间

    reverse()//排序的用法




