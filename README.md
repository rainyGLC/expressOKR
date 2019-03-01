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
查看单个借口：http://localhost:3000/api/okr/:id
编辑接口：http://localhost:3000/api/okr/:id


三件事部分
添加的接口：http://localhost:3000/api/todos
需要传入的参数为：
{
  "token": "077a30ac140a35bd63fbea9076863a0b",
  "todos": [{"value": "项目 1","keyresults":[1,2]},{"value": "项目 2","keyresults": []},
            {"value": "项目三","keyresults": [1]}],
  "surprise":"bbb"
}

跨域请求的文件在middlewares/cors.js,可在路由中直接引用cors.allowAll()方法

数据库的文件在sql文件夹下


启动 npm install 
    node ./bin/www
    



