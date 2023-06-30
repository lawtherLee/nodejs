// 3.表单验证

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

const joi = require('joi')

const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^\S{2,12}$/).required()

const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

exports.reg_login_schema = {
    body: {
        username,
        password
    }
}
exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}
exports.update_password_schema = {
    body: {
        // joi.ref('oldPwd')` 表示 `newPwd` 的值必须和 `oldPwd` 的值保持一致
        // joi.not(joi.ref('oldPwd'))` 表示 `newPwd` 的值不能等于 `oldPwd` 的值
        // .concat()` 用于合并 `joi.not(joi.ref('oldPwd'))` 和 `password` 这两条验证规则
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

exports.update_avatar_schema = {
    body: {
        avatar
    }
}
