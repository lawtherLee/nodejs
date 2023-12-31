const express = require('express')
const expressJoi = require('@escook/express-joi')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const upload = multer({dest: path.join(__dirname, '../uploads')})

const articleHandler = require('../router_handler/article')
const {add_article_schema} = require('../schema/article')
// 使用 `upload.single()` 方法，它是一个局部生效的中间件，用来解析 `FormData` 格式的表单数据
// 将文件类型的数据，解析并挂载到 `req.file` 属性中
// 将文本类型的数据，解析并挂载到 `req.body` 属性中
router.post('/add', upload.single('cover_img'), expressJoi(add_article_schema), articleHandler.addArticle)


module.exports = router
