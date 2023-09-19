const repo = require('./repo')
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
            ...item,
            member_image: `${baseURL}/${item.member_image}`
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
        ...data,
        member_id: null,
        delegation_id: 0,
        province_id: 1,
        member_email: '',
        member_birthplace: '',
        member_birthday: new Date(),
        member_image: '',
        member_job: '',
        member_marital: 0,
        member_wives_number: 0,
        member_children_number: 0,
        member_join_year: 0,
        member_special: 0,
        member_management: 0,
        member_satgas: 0,
        member_teacher: 0,
        member_status: 0,
        member_last_education: '',
        member_major_education: ''
    }
    return await repo.insert(newdata)
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

