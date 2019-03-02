# expressOKR
探月 OKR 项目需求

登录的API接口为：http://localhost:3000/api/login
请求成功时json返回
{
    "code": 200,
    "message": "登录成功!",
    "token": "077a30ac140a35bd63fbea9076863a0b"
}
OKR部分
添加的接口：http://localhost:3000/api/okr
查看所有okr接口：http://localhost:3000/api/okr
查看单个接口：http://localhost:3000/api/okr/:id
编辑接口：http://localhost:3000/api/okr/:id


三件事部分
添加的接口：http://localhost:3000/api/todos
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



跨域请求的文件在middlewares/cors.js,可在路由中直接引用cors.allowAll()方法

数据库的文件在sql文件夹下


启动 npm install 
    node ./bin/www
    



