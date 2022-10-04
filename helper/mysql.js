require('dotenv').config()
var mysql = require('mysql')
var config = {
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}
var pool

module.exports = {
    init: () => {
        pool = mysql.createPool(config)
    },
    execute: (query, params = []) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err){
                    // connection.release()
                    reject(err)
                    return
                }
                connection.query(query, params, (err, rows) => {
                    connection.release()
                    if(!err){
                        resolve(rows)
                        return
                    }else{
                        reject(err)
                        return
                    }
                })
                connection.on('error', (err) => {
                    reject(err)
                    return
                })
            })
        })
    }
}