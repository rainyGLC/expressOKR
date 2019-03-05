    登录的API接口为：http://localhost:3000/api/login
    请求类型：POST

    处理逻辑：获取到用户提交的邮箱账号、密码后，去 users 表中校验是否存在，如果不存在返回错误提示，如果存在将用户 ID、用户名、密码进行加密成 token 返回给客户端，在之后的请求中，客户端都需要带上这个 token 以标识鉴定是哪一个用户。

    请求成功时json返回
    {
        "code": 200,
        "message": "登录成功!",
        "token": "077a30ac140a35bd63fbea9076863a0b"
    }


  OKR部分
    用户登录后，第一个需要用到的接口就是 OKR 相关，需要获取最近的一项目标是否有效，如果没有有效的目标则定位在添加 OKR 页面。在添加 OKR 的时候，可以为 绑定多个 KR。

    添加的接口：http://localhost:3000/api/okr
    请求类型：POST
    处理逻辑：在 objectives 中添加一条记录，同时在 keyresults 表中添加关联记录
    {
      objective: '目标名称',
      deadline: 1550822695611,
      keyresults: ['成就 1','成就 2']
    }

    查看所有okr接口：http://localhost:3000/api/okr
    请求类型：GET
    处理逻辑：到  objectives 表中查询当前用户下的 OKR 然后关联查询 keyresults 表返回数据。
    使用场景：我的 okr 列表页数据、启动判断是否拥有有效 OKR
    返回数据事例：
      ／/ 无数据
      []
      // 有数据
      [{
        id: 1,
        objective: '第一个目标是',
        deadline: 1550822695611,
        keyresults: [{
          id: 1,
          keyresult: '成就 1'
        },{
          id: 1,
          keyresult: '成就 2'
        }]
      },{
        id: 2,
        objective: '第二个目标是',
        deadline: 1550822695611,
        keyresults: [{
          id: 3,
          keyresult: '成就 3'
        }]
      }]

    
    查看单个接口：http://localhost:3000/api/okr/:id
    请求类型：GET
    处理逻辑：到  objectives 表中查询该 id 下的 okr，并关联 keyresults 表返回数据。
    编辑接口：http://localhost:3000/api/okr/:id
    返回数据事例：
       {
        id: 1,
        objective: '第一个目标是',
        deadline: 1550822695611,
        keyresults: [{
          id: 1,
          keyresult: '成就 1'
        },{
          id: 2,
          keyresult: '成就 2'
        }]
      }


    修改 OKR
    请求类型： PUT
    请求地址： /api/okr/1
    处理逻辑：在 objectives 中修改对应记录，同时在 keyresults 表中修改关联记录。
    使用场景：添加 OKR
    {
      objective: '新目标名称',
      deadline: 1550822695611,
      keyresults: [{
        id: 3
        keyresult: '新成就 3'
      }]
    }



    三件事部分
      添加的接口：http://localhost:3000/api/todos
      请求类型：POST
      需要传入的参数为：
      {
        todos: [{
          value: '项目 1',
          keyresults: [1,2]
        },{
          value: '项目 2',
          keyresults: []
        },{
          value: '项目三',
          keyresults: [1]
        }],
        surprise: 'xxxxxxx'
      }


      获取单条 Todos的接口:http://localhost:3000/api/todos/:id
      请求类型：GET
      需要传入的参数为：
      {
        todos: [{
          id: 3,
          value: '项目 1',
        },{
          id: 4,
          value: '项目 2',
        },{
          id: 5,
          value: '项目三',
        }],
        surprise: 'xxxxxxx'
      }

    修改 todos的接口:http://localhost:3000/api/todos/:id
    请求类型：POST
    需要传入的参数为：
    {
      todos: [{
        id: 3,
        status: 1,
      },{
        id: 4,
        status: 0,
      },{
        id: 5,
        status: 0,
      }],
      reflect: 'xxxxxxx',
      happiness: [1,2,3]
    }

    历史记录 获取所有todos的接口 :http://localhost:3000/api/todos
    请求类型：GET
    需要传入的参数为：
    {
      "token": "077a30ac140a35bd63fbea9076863a0b"
    }

    查询 KR的接口:http://localhost:3000/api/todo-kr/:id
    请求类型：GET
    需要传入的参数为：
    返回数据:
    [{
      objective: '目标名称',
      keyresults: ['成就 1']
    },{
      objective: '目标名称2',
      keyresults: ['成就 3','成就 4']
    }]

    跨域请求的文件在middlewares/cors.js,可在路由中直接引用cors.allowAll()方法
    数据库的文件在sql文件夹下

    探月OKR项目需求：https://shimo.im/docs/G9tvDrpGWwPQX6Xg/read
    数据库设计：https://shimo.im/docs/WxK9PDJJjKxCJQkQ/read
    API设计：https://shimo.im/docs/QT9KcGWrD3yxYyyY/read


