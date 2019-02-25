# expressOKR
探月 OKR 项目需求

登录的API接口为：http://localhost:3000/api/login
请求成功时json返回
{
    "code": 200,
    "message": "登录成功!",
    "token": "077a30ac140a35bd63fbea9076863a0b"
}


跨域请求的文件在middlewares/cors.js,可在路由中直接引用cors.allowAll()方法

数据库的文件在sql文件夹下

