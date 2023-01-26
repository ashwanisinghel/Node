const mysql= require('mysql2')

const pool= mysql.createPool({
    host:'localhost',
    user:'root',
    user:'node_practice',
    password:'153624'
})

module.exports=pool.promise()