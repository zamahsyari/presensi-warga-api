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
    let newdata = {
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
    }
    delete newdata.interval
    if(data.interval == 'HARIAN'){
        await repo.insert(newdata)
    }else if(data.interval == 'MINGGUAN'){
        await repo.insert(newdata)
        for(let i=1; i<4; i++){
            let newStart = new Date(data.start_at)
            newStart.setDate(newStart.getDate() + (i * 7))

            let newEnd = new Date(data.end_at)
            newEnd.setDate(newEnd.getDate() + (i * 7))

            await repo.insert({
                ...newdata,
                start_at: newStart,
                end_at: newEnd
            })
        }
    }else if(data.interval == 'BULANAN'){
        await repo.insert(newdata)
        for(let i=1; i<12; i++){
            let newStart = new Date(data.start_at)
            newStart.setMonth(newStart.getMonth() + i)

            let newEnd = new Date(data.end_at)
            newEnd.setMonth(newEnd.getMonth() + i)

            await repo.insert({
                ...newdata,
                start_at: newStart,
                end_at: newEnd
            })
        }
    }else if(data.interval == 'TAHUNAN'){
        await repo.insert(newdata)
        for(let i=1; i<5; i++){
            let newStart = new Date(data.start_at)
            newStart.setFullYear(newStart.getFullYear() + i)

            let newEnd = new Date(data.end_at)
            newEnd.setFullYear(newEnd.getFullYear() + i)

            await repo.insert({
                ...newdata,
                start_at: newStart,
                end_at: newEnd
            })
        }
    }else{
        await repo.insert(newdata)
    }
    return {
        interval: data.interval,
        success: true
    }
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

