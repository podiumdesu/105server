### /user/register(注册)
​ POST
​  _request:_
​   username | string | 用户名
​   password | string | 密码
​  _response:_
​   201 Created
​   jwt | string | 生成的jwt
​   400 Bad Request
​   [
​    {
​     name | string | 出现错误的参数名(username和password),
​     error | string | 对错误的描述
​    }
   ]

### /user/login(登录)
   ​ POST
   ​  _request:_
   ​   username | string | 用户名
   ​   password | string | 密码
   ​  _response:_
   ​   200 OK
   ​   jwt | string | 生成的jwt
   ​   400 Bad Request
   ​   [
   ​    {
   ​     name | string | 出现错误的参数名(username和password),
   ​     error | string | 对错误的描述
   ​    }
   ​   ]

### /user(查询/修改当前用户信息)

​ GET

​  response:

​   200 OK

​   username | string | 用户名

​   password | string | 密码

​ PATCH

​  request:

​   avatar |  string | 新头像的id | 可为空

​   self_password | string | 原密码 | 当passowrd为空时可为空

​   password | string | 旧密码 | 当self_password为空时可为空

​  response:

​   200 OK

​   username | string | 用户名

​   password | string | 密码

​   400 Bad Request

​   [

​    {

​     name | string | 出现错误的参数名,

​     error | string | 对错误的描述

​    }

​   ]
