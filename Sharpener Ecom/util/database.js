const mysql= require('mysql2')

const pool= mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'node_practice',
    password:'153624'
})

module.exports=pool.promise()