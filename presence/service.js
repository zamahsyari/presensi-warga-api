const repo = require('./repo')
const sha256 = require('sha256')
const md5 = require('md5')
const redisHelper = require('../helper/redis')
const { v4 } = require('uuid')

const getTotalPage = (total, perPage) => {
    return Math.ceil(total/perPage)
}

exports.findAll = async (params) => {
    const data = await repo.findAll(params)
    const total = await repo.findAllCount(params)
    return {
        data,
        total_data: total[0].total,
        total_page: getTotalPage(total[0].total, params.per_page)
    }
}

exports.findById = async (id) => {
    return await repo.findAll({
        per_page: 10,
        page: 1,
        sort: null,
        filter: [`id:${id}`]
    })
}

exports.add = async (data) => {
    const newdata = {
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
    }
    const getAllPresences = await repo.findByKey('event_id', data.event_id)
    const filtered = getAllPresences.filter(item => item.member_id === data.member_id)
    if(filtered.length > 0){
        throw new Error('already present')
    }
    return await repo.insert(newdata)
}

exports.update = async (id, data) => {
    const newdata = {
        ...data,
        updated_at: new Date(),
    }
    return await repo.updateById(id, newdata)
}

exports.delete = async (id) => {
    return await repo.deleteById(id)
}

const countWarga = (data, permitType, gender) => {
    const len = data.filter(item => item.permit_type == permitType && item.gender == gender).length
    if(len > 0){
        return data.filter(item => item.permit_type == permitType && item.gender == gender)[0].jml
    }
    return 0
}

exports.getStats = async (eventId) => {
    const data = await repo.getStats(eventId)
    let res = []
    res.push({
        gender: 'MALE',
        hadir: countWarga(data, 0, 1),
        sakit: countWarga(data, 1, 1),
        kerja: countWarga(data, 2, 1),
        pulkam: countWarga(data, 3, 1),
        lainnya: countWarga(data, 4, 1)
    })
    res.push({
        gender: 'FEMALE',
        hadir: countWarga(data, 0, 2),
        sakit: countWarga(data, 1, 2),
        kerja: countWarga(data, 2, 2),
        pulkam: countWarga(data, 3, 2),
        lainnya: countWarga(data, 4, 2)
    })
    return {
        data: res
    }
}

