// 1。引入数据库
const mysql = require('mysql')
const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'my_db_01'
})
module.exports = db
