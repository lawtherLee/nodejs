const db = require('../db/index')

exports.getUserInfo = (req, res) => {
    console.log(req)
    const sql = 'SELECT id,username,nickname,email,user_pic FROM users WHERE id = ?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取用户信息失败')

        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: results[0]
        })
    })
}

exports.updateUserInfo = (req, res) => {
    console.log(req)
    const sql = 'UPDATE users SET nickname = ?, email = ? WHERE id = ?'
    db.query(sql, [req.body.nickname, req.body.email, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('修改失败')
        res.cc('修改用户信息成功', 0)
    })
}
