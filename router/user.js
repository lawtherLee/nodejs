// 3. 定义处理函数
const express = require('express')
// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const {reg_login_schema} = require('../schema/user')
// 创建路由对象
const router = express.Router()

// 4.导入用户路由处理函数模块(接口部分)
const userHandler = require('../router_handler/user')

// 注册用户
router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser)
// 用户登录
router.post('/login', expressJoi(reg_login_schema), userHandler.login)

module.exports = router
