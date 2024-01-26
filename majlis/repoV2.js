const db = require('../helper/mysql')
const tableName = 'majlis'

const getOffset = (params) => {
    return (params.page - 1) * params.per_page
}

exports.findAll = (params) => {
    let query = `SELECT * FROM ${tableName} WHERE 1=1`
    if(params.filter){
        for(let i=0; i<params.filter.length; i++){
            const key = params.filter[i].split(':')[0]
            const value = params.filter[i].split(':')[1]
            if(key == 'nama_majlis' || key == 'alamat_majlis'){
                query += ` AND ${key} LIKE "%${value}%"`
            }else{
                query += ` AND ${tableName}.${key} = ${value}`
            }
        }
    }
    if(params.sort){
        const key = params.sort.split(':')[0]
        const value = params.sort.split(':')[1]
        query += ` ORDER BY ${key} ${value}`
    }
    query += ` LIMIT ${params.per_page} OFFSET ${getOffset(params)}`
    return db.execute(query)
}

exports.findAllCount = (params) => {
    let query = `SELECT count(*) AS total FROM ${tableName} WHERE 1=1`
    if(params.filter){
        for(let i=0; i<params.filter.length; i++){
            const key = params.filter[i].split(':')[0]
            const value = params.filter[i].split(':')[1]
            if(key == 'nama_majlis' || key == 'alamat_majlis'){
                query += ` AND ${key} LIKE "%${value}%"`
            }else{
                query += ` AND ${tableName}.${key} = ${value}`
            }
        }
    }
    if(params.sort){
        const key = params.sort.split(':')[0]
        const value = params.sort.split(':')[1]
        query += ` ORDER BY ${key} ${value}`
    }
    return db.execute(query)
}

exports.findByKey = (key, value) => {
    const query = `SELECT * FROM ${tableName} WHERE ${key} = ?`
    return db.execute(query, [value])
}

exports.findPerwakilan = (params) => {
    let query = `SELECT * FROM ${tableName} WHERE kode_majlis not like "%.%" and kode_majlis <> "-" and kode_majlis not like "b%"`
    if(params.filter){
        for(let i=0; i<params.filter.length; i++){
            const key = params.filter[i].split(':')[0]
            const value = params.filter[i].split(':')[1]
            if(key == 'nama_majlis' || key == 'alamat_majlis'){
                query += ` AND ${key} LIKE "%${value}%"`
            }else{
                query += ` AND ${key} = ${value}`
            }
        }
    }
    if(params.q){
        query += ` AND nama_majlis LIKE "%${params.q}%"`
    }
    if(params.sort){
        const key = params.sort.split(':')[0]
        const value = params.sort.split(':')[1]
        query += ` ORDER BY ${key} ${value}`
    }
    query += ` LIMIT ${params.per_page} OFFSET ${getOffset(params)}`
    console.log('query', query)
    return db.execute(query)
}

exports.findPerwakilanCount = (params) => {
    let query = `SELECT count(*) AS total FROM ${tableName} WHERE kode_majlis not like "%.%" and kode_majlis <> "-" and kode_majlis not like "b%"`
    if(params.filter){
        for(let i=0; i<params.filter.length; i++){
            const key = params.filter[i].split(':')[0]
            const value = params.filter[i].split(':')[1]
            if(key == 'nama_majlis' || key == 'alamat_majlis'){
                query += ` AND ${key} LIKE "%${value}%"`
            }else{
                query += ` AND ${key} = ${value}`
            }
        }
    }
    if(params.q){
        query += ` AND nama_majlis LIKE "%${params.q}%"`
    }
    if(params.sort){
        const key = params.sort.split(':')[0]
        const value = params.sort.split(':')[1]
        query += ` ORDER BY ${key} ${value}`
    }
    return db.execute(query)
}

exports.findCabang = (code, params) => {
    let query = `SELECT * FROM ${tableName} WHERE kode_majlis like "${code}.%"`
    if(params.filter){
        for(let i=0; i<params.filter.length; i++){
            const key = params.filter[i].split(':')[0]
            const value = params.filter[i].split(':')[1]
            if(key == 'nama_majlis' || key == 'alamat_majlis'){
                query += ` AND ${key} LIKE "%${value}%"`
            }else{
                query += ` AND ${key} = ${value}`
            }
        }
    }
    if(params.q){
        query += ` AND nama_majlis LIKE "%${params.q}%"`
    }
    if(params.sort){
        const key = params.sort.split(':')[0]
        const value = params.sort.split(':')[1]
        query += ` ORDER BY ${key} ${value}`
    }
    query += ` LIMIT ${params.per_page} OFFSET ${getOffset(params)}`
    return db.execute(query)
}

exports.findCabangCount = (code, params) => {
    let query = `SELECT count(*) AS total FROM ${tableName} WHERE kode_majlis like "${code}.%"`
    if(params.filter){
        for(let i=0; i<params.filter.length; i++){
            const key = params.filter[i].split(':')[0]
            const value = params.filter[i].split(':')[1]
            if(key == 'nama_majlis' || key == 'alamat_majlis'){
                query += ` AND ${key} LIKE "%${value}%"`
            }else{
                query += ` AND ${key} = ${value}`
            }
        }
    }
    if(params.q){
        query += ` AND nama_majlis LIKE "%${params.q}%"`
    }
    if(params.sort){
        const key = params.sort.split(':')[0]
        const value = params.sort.split(':')[1]
        query += ` ORDER BY ${key} ${value}`
    }
    return db.execute(query)
}

exports.insert = (data) => {
    const query = `INSERT INTO ${tableName} SET ?`
    return db.execute(query, [data])
}

exports.updateById = (id, data) => {
    const query = `UPDATE ${tableName} SET ? WHERE id_majlis = ?`
    return db.execute(query, [data, id])
}

exports.deleteById = (id) => {
    const query = `DELETE FROM ${tableName} WHERE id_majlis = ?`
    return db.execute(query, [id])
}