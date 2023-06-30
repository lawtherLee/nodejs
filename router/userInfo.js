const express = require('express')
const router = express.Router()

// 验证数据合法性中间件
const expressJoi = require('@escook/express-joi')
const {update_userinfo_schema, update_password_schema} = require('../schema/user')

const userInfoHandle = require('../router_handler/userInfo')

router.get('/userinfo', userInfoHandle.getUserInfo)

router.post('/userinfo', expressJoi(update_userinfo_schema), userInfoHandle.updateUserInfo)

router.post('/updatepwd', expressJoi(update_password_schema), userInfoHandle.updatePassword)

router.post('/update/avatar', userInfoHandle.updateAvatar)
module.exports = router
