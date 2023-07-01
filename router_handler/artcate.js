const db = require('../db/index')

exports.getArticleCates = (req, res) => {
    const sql = 'SELECT * FROM article_cate WHERE is_del = 1 ORDER BY id ASC'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取文章分类成功',
            data: results
        })
    })
}
exports.addArticleCates = (req, res) => {
    // 查询名字是否占用
    const sql = 'SELECT * FROM article_cate WHERE name = ? OR alias = ?'
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试') // 都被占用
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用')

        const sql = 'INSERT INTO article_cate SET ?'
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增文章失败')
            res.cc('新增文章成功', 0)
        })
    })
}
exports.deleteCateById = (req, res) => {
    const sql = 'UPDATE article_cate SET is_del = ? WHERE id = ?'
    db.query(sql, [0, req.params.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除失败')
        res.cc('删除成功', 0)
    })
}
exports.getArticleById = (req, res) => {
    const sql = 'SELECT * FROM article_cate WHERE id = ?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('没有这个文章')
        res.send({
            status: 0,
            message: '获取文章分类数据成功',
            data: results[0]
        })
    })
}
exports.updateArticleById = (req, res) => {
    // 查询 分类名称 与 分类别名 是否被占用
    const sql = 'SELECT * FROM article_cate WHERE Id != ? AND (name = ? OR alias = ?) '
    db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用')

        const sql = 'UPDATE article_cate SET ? WHERE Id = ?'
        db.query(sql, [req.body, req.body.Id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新文章失败')
            res.cc('更新文章成功', 0)
        })
    })
}
