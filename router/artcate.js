const express = require('express')
const router = express.Router()
const articleHandle = require('../router_handler/artcate')
const expressJoi = require('@escook/express-joi')
const {add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema} = require('../schema/artcate')
/**
 * 获取文章列表
 */
router.get('/cates', articleHandle.getArticleCates)
/**
 * 新增文章
 */
router.post('/addcates', expressJoi(add_cate_schema), articleHandle.addArticleCates)
/**
 * 删除文章
 */
router.get('/deletecate/:id', expressJoi(delete_cate_schema), articleHandle.deleteCateById)
/**
 * 根据ID获取文章列表
 */
router.get('/cate/:id', expressJoi(get_cate_schema), articleHandle.getArticleById)

/**
 * 更新文章
 */
router.post('/updatecate', expressJoi(update_cate_schema), articleHandle.updateArticleById)

module.exports = router
