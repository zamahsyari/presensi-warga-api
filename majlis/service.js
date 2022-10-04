const repo = require('./repo')
const sha256 = require('sha256')
const md5 = require('md5')
const redisHelper = require('../helper/redis')
const { v4 } = require('uuid')

const getTotalPage = (total, perPage) => {
    return Math.ceil(total/perPage)
}

exports.findAllPerwakilan = async (params) => {
    const data = await repo.findPerwakilan(params)
    const total = await repo.findPerwakilanCount(params)
    return {
        data,
        total_data: total[0].total,
        total_page: getTotalPage(total[0].total, params.per_page)
    }
}

exports.findCabangByPerwakilan = async (code, params) => {
    const data = await repo.findCabang(code, params)
    const total = await repo.findCabangCount(code, params)
    return {
        data,
        total_data: total[0].total,
        total_page: getTotalPage(total[0].total, params.per_page)
    }
}