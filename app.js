// 2.配置服务
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.urlencoded({extended: false}))

// 相应数据的中间件
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})
// 挂载接口路由
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 解析token中间件
const expressJWT = require('express-jwt')
const config = require('./config')
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({secret: config.jwtSecretKey}).unless({path: [/^\/api\//]}))

const userInfoRouter = require('./router/userInfo')
app.use('/my', userInfoRouter)

// 定义捕获错误中间件
const joi = require('joi')
app.use((err, req, res, next) => {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err, '表单校验失败')
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')
    res.cc(err)
})
app.listen(3307, () => {
    console.log('api server running at http://127.0.0.1:3007')
})
