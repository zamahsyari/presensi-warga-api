const repo = require('./repoV2')
const sha256 = require('sha256')
const md5 = require('md5')
const redisHelper = require('../helper/redis')
const { v4 } = require('uuid')

const getTotalPage = (total, perPage) => {
    return Math.ceil(total/perPage)
}

exports.findAllPerwakilan = async (params) => {
    let data = await repo.findPerwakilan(params)
    data = data.map(item => {
        return {
            id: item.id_majlis,
            code: item.kode_majlis,
            name: item.nama_majlis,
            address: item.alamat_majlis,
        }
    })
    const total = await repo.findPerwakilanCount(params)
    return {
        data,
        total_data: total[0].total,
        total_page: getTotalPage(total[0].total, params.per_page)
    }
}

exports.findCabangByPerwakilan = async (code, params) => {
    let data = await repo.findCabang(code, params)
    data = data.map(item => {
        return {
            id: item.id_majlis,
            code: item.kode_majlis,
            name: item.nama_majlis,
            address: item.alamat_majlis,
        }
    })
    const total = await repo.findCabangCount(code, params)
    return {
        data,
        total_data: total[0].total,
        total_page: getTotalPage(total[0].total, params.per_page)
    }
}

exports.findById = async (id) => {
    let data = await repo.findByKey('id_majlis', id)
    data = data.map(item => {
        return {
            id: item.id_majlis,
            code: item.kode_majlis,
            name: item.nama_majlis,
            address: item.alamat_majlis,
        }
    })
    return {
        data,
        total_data: 1,
        total_page: 1
    }
}