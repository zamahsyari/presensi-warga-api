const repo = require('./repoV2')
const sha256 = require('sha256')
const md5 = require('md5')
const redisHelper = require('../helper/redis')
const { v4 } = require('uuid')

const getTotalPage = (total, perPage) => {
    return Math.ceil(total/perPage)
}

exports.findAll = async (params) => {
    let data = await repo.findAll(params)
    const total = await repo.findAllCount(params)
    const baseURL = 'http://103.82.242.44:5000/files'
    data = data.map(item => {
        return {
            id: item.id_warga,
            ktp: item.nik,
            name: item.nama_warga,
            address: item.alamat_warga,
            phone: item.phone_warga,
            occupation: item.pekerjaan_warga,
            is_khususi: item.khususi_warga == 1 ? true : false,
            is_mustamik: item.mustamik == 1 ? true : false,
            majlis_id: item.id_majlis,
            birth_place: item.tempat_lahir_warga,
            birth_date: item.tanggal_lahir_warga,
        }
    })
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
        nik: data.ktp,
        nama_warga: data.name,
        alamat_warga: data.address,
        phone_warga: data.phone,
        pekerjaan_warga: data.occupation,
        khususi_warga: data.is_khususi ? 1 : 0,
        mustamik: data.is_mustamik ? 1 : 0,
        id_majlis: data.majlis_id,
        tempat_lahir_warga: data.birth_place,
        tanggal_lahir_warga: new Date(data.birth_date),
        status_keaktifan_warga: 1,
    }
    await repo.insert(newdata)
    return {
        success: true
    }
}

exports.update = async (id, data) => {
    const newdata = {
        ...data
    }
    return await repo.updateById(id, newdata)
}

exports.delete = async (id) => {
    return await repo.deleteById(id)
}

