const express = require('express')
const router = express.Router()

// 验证数据合法性中间件
const expressJoi = require('@escook/express-joi')
const {update_userinfo_schema} = require('../schema/user')

const userInfoHandle = require('../router_handler/userInfo')

router.get('/userinfo', userInfoHandle.getUserInfo)

router.post('/userinfo', expressJoi(update_userinfo_schema), userInfoHandle.updateUserInfo)

module.exports = router
