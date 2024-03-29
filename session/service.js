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
    await repo.insert(data)
    return {
        success: true
    }
}

exports.update = async (id, data) => {
    return await repo.updateById(id, data)
}

exports.delete = async (id) => {
    return await repo.deleteById(id)
}

