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
        if (results.affectedRows !== 1) return res.cc('修改失败') // 执行 sql 语句成功，但影响函数不为 1、
        res.cc('修改用户信息成功', 0)
    })
}

exports.updatePassword = (req, res) => {
    const sql = 'SELECT * FROM users WHERE id = ?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('用户不存在')

        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.cc('旧密码错误')

        // 更新密码
        const sql = 'UPDATE users SET PASSWORD = ? WHERE id = ?'
        const newpwd = bcrypt.hashSync(req.body.newPwd, 10) // 新密码加密
        db.query(sql, [newpwd, req.user.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新失败')
            res.cc('更新成功', 0)
        })
    })
}

exports.updateAvatar = (req, res) => {

}
