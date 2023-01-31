const db = require('../helper/mysql')
const tableName = 'presences'

const getOffset = (params) => {
    return (params.page - 1) * params.per_page
}

exports.findAll = (params) => {
    let query = `SELECT pr.*, of.office_name, ev.name, mm.member_name, mm.member_gender
        FROM ${tableName} pr
        LEFT JOIN members mm ON mm.member_id = pr.member_id
        JOIN events ev ON ev.id = pr.event_id
        JOIN offices of ON of.office_id = ev.office_id
        WHERE 1=1`
    if(params.filter){
        for(let i=0; i<params.filter.length; i++){
            const key = params.filter[i].split(':')[0]
            const value = params.filter[i].split(':')[1]
            if(key == 'name' || key == 'description'){
                query += ` AND ${key} LIKE "%${value}%"`
            }else if(key == 'member_gender'){
                query += ` AND mm.${key} = ${value}`
            }else{
                query += ` AND pr.${key} = ${value}`
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
    let query = `SELECT count(*) AS total FROM ${tableName} pr
        LEFT JOIN members mm ON mm.member_id = pr.member_id
        WHERE 1=1`
    if(params.filter){
        for(let i=0; i<params.filter.length; i++){
            const key = params.filter[i].split(':')[0]
            const value = params.filter[i].split(':')[1]
            if(key == 'name' || key == 'description'){
                query += ` AND ${key} LIKE "%${value}%"`
            }else if(key == 'member_gender'){
                query += ` AND mm.${key} = ${value}`
            }else{
                query += ` AND pr.${key} = ${value}`
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

exports.insert = (data) => {
    const query = `INSERT INTO ${tableName} SET ?`
    return db.execute(query, [data])
}

exports.updateById = (id, data) => {
    const query = `UPDATE ${tableName} SET ? WHERE id = ?`
    return db.execute(query, [data, id])
}

exports.deleteById = (id) => {
    const query = `DELETE FROM ${tableName} WHERE id = ?`
    return db.execute(query, [id])
}

// const generateCountQuery = (eventId, permitType, gender) => {
//     return `(select count(*) from presences pr
//     join members mm on mm.member_id = pr.member_id
//     where event_id = ${eventId}
//     and permit_type = ${permitType}
//     and member_gender = ${gender})`
// }

// exports.getStats = (eventId) => {
//     const query = `select 
//     ${generateCountQuery(eventId, 0, 0)} as putraHadir,
//     ${generateCountQuery(eventId, 1, 0)} as putraSakit,
//     ${generateCountQuery(eventId, 2, 0)} as putraKerja,
//     ${generateCountQuery(eventId, 3, 0)} as putraPulkam,
//     ${generateCountQuery(eventId, 3, 0)} as putraLain,
//     ${generateCountQuery(eventId, 0, 1)} as putriHadir,
//     ${generateCountQuery(eventId, 1, 1)} as putriSakit,
//     ${generateCountQuery(eventId, 2, 1)} as putriKerja,
//     ${generateCountQuery(eventId, 3, 1)} as putriPulkam,
//     ${generateCountQuery(eventId, 3, 1)} as putriLain`
//     return db.execute(query)
// }

exports.getStats = (eventId) => {
    const query = `SELECT permit_type, mm.member_gender as gender, COUNT(permit_type) as jml from presences pr
    JOIN members mm ON mm.member_id = pr.member_id
    WHERE event_id = ${eventId}
    GROUP BY pr.permit_type, mm.member_gender`
    return db.execute(query)
}