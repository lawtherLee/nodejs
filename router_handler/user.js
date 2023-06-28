/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
const db = require('../db/index')
const bcrypt = require('bcryptjs') // 密码加密
const jwt = require('jsonwebtoken') // 生成token
const config = require('../config') // token加密配置项

// 注册用户接口
exports.regUser = (req, res) => {
    const regInfo = req.body
    if (!regInfo.username || !regInfo.password) return res.cc('用户名密码不为空')

    // 查询是否占用
    const sql = 'SELECT * FROM users where username = ?'
    db.query(sql, regInfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length > 0) return res.cc('用户名被占用')

        regInfo.password = bcrypt.hashSync(regInfo.password, 10)
        const insertSql = 'INSERT INTO users SET ?'
        db.query(insertSql, {username: regInfo.username, password: regInfo.password}, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('注册失败')
            res.cc('success', 0)
        })
    })
}

// 登录接口
exports.login = (req, res) => {
    const loginInfo = req.body
    const sql = 'SELECT * FROM users WHERE username = ?'
    db.query(sql, loginInfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('没这个用户')

        // 拿着用户的密码跟数据库的密码对比
        const compareResult = bcrypt.compareSync(loginInfo.password, results[0].password)
        if (!compareResult) {
            return res.cc('密码错误')
        }

        const userInfo = {...results[0], password: '', user_pic: ''} // 剔除这些数据
        const tokenStr = jwt.sign(userInfo, config.jwtSecretKey, {expiresIn: config.expiresIn}) // token
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + tokenStr
        })
    })
}
