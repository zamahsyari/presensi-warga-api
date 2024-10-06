const db = require('../helper/mysql')
const tableName = 'members'

const getOffset = (params) => {
    return (params.page - 1) * params.per_page
}

exports.findAll = (params) => {
    let query = `SELECT ${tableName}.* FROM ${tableName} WHERE 1=1`
    if(params.filter){
        for(let i=0; i<params.filter.length; i++){
            const key = params.filter[i].split(':')[0]
            const value = params.filter[i].split(':')[1]
            if(key == 'member_name' || key == 'member_address'){
                query += ` AND ${key} LIKE "%${value}%"`
            }else if(key == 'member_card_id'){
                query += ` AND ${key} = "${value}"`
            }else if(key == 'office_id' || key === 'majlis_id'){
                query += ` AND office_id = "${value}"`
            }else{
                query += ` AND ${tableName}.${key} = ${value}`
            }
        }
    }
    if(params.q){
        query += ` AND member_name LIKE "%${params.q}%"`
    }
    if(params.majlis){
        query += ` AND office_id = ${params.majlis}`
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
    let query = `SELECT count(*) as total FROM ${tableName} WHERE 1=1`
    if(params.filter){
        for(let i=0; i<params.filter.length; i++){
            const key = params.filter[i].split(':')[0]
            const value = params.filter[i].split(':')[1]
            if(key == 'member_name' || key == 'member_address'){
                query += ` AND ${key} LIKE "%${value}%"`
            }else if(key == 'member_card_id'){
                query += ` AND ${key} = "${value}"`
            }else if(key == 'office_id' || key === 'majlis_id'){
                query += ` AND office_id = "${value}"`
            }else{
                query += ` AND ${tableName}.${key} = ${value}`
            }
        }
    }
    if(params.q){
        query += ` AND member_name LIKE "%${params.q}%"`
    }
    if(params.majlis){
        query += ` AND office_id = ${params.majlis}`
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

exports.insert = (data) => {
    const query = `INSERT INTO ${tableName} SET ?`
    return db.execute(query, [data])
}

exports.updateById = (id, data) => {
    const query = `UPDATE ${tableName} SET ? WHERE member_id = ?`
    return db.execute(query, [data, id])
}

exports.deleteById = (id) => {
    const query = `DELETE FROM ${tableName} WHERE member_id = ?`
    return db.execute(query, [id])
}