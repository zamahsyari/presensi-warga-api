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
            id: item.member_id,
            ktp: item.member_ktp,
            name: item.member_name,
            address: item.member_address,
            phone: item.member_phone,
            occupation: item.member_job,
            // is_khususi: item.member_khususi == 1 ? true : false,
            is_mustamik: item.member_mustamik == 1 ? true : false,
            majlis_id: item.office_id,
            birth_place: item.member_birthplace,
            birth_date: item.member_birthday,
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
        member_ktp: data.ktp,
        member_name: data.name,
        member_address: data.address,
        member_phone: data.phone,
        member_job: data.occupation,
        // member_khususi: data.is_khususi ? 1 : 0,
        member_mustamik: data.is_mustamik ? 1 : 0,
        office_id: data.majlis_id,
        tempat_lahimember_birthplacer_warga: data.birth_place,
        member_birthday: new Date(data.birth_date),
        member_status: 1,
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

