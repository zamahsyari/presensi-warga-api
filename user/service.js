const repo = require('./repo')
const majlisRepo = require('../majlis/repo')
const sha256 = require('sha256')
const md5 = require('md5')
const redisHelper = require('../helper/redis')
const { v4 } = require('uuid')

exports.register = async (data) => {
    const password = md5(data.password)
    const registerData = {
        ...data,
        user_password: password
    }
    const check = await repo.findByKey('user_name', data.username)
    if(check.length > 0){
        throw { status: 400, code: 300, message: 'email already exist' }
    }
    await repo.insert(registerData)
    return {
        message: 'success'
    }
}

exports.login = async (data) => {
    const checkEmail = await repo.findByKey('user_name', data.username)
    const checkMajlis = await majlisRepo.findByKey('office_code', data.username)
    if(checkEmail.length < 1 && checkMajlis.length < 1){
        throw { status: 400, code: 100, message: 'email not found' }
    }
    const hashed = md5(data.password)
    if(checkEmail.length > 0){
        if(checkEmail[0].user_password != hashed){
            throw { status: 400, code: 200, message: 'invalid credential' }
        }
        const uuid = v4()
        await redisHelper.set(uuid, JSON.stringify({
            username: data.username
        }))
        return {
            id: checkEmail[0].user_id,
            username: checkEmail[0].user_name,
            token: uuid
        }
    }else{
        if(checkMajlis[0].office_password != hashed){
            throw { status: 400, code: 200, message: 'invalid credential' }
        }
        const uuid = v4()
        await redisHelper.set(uuid, JSON.stringify({
            username: data.username
        }))
        return {
            id: checkMajlis[0].office_id,
            username: checkMajlis[0].office_code,
            token: uuid
        }
    }
}

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
    return await repo.findByKey('user_id', id)
}

exports.add = async (data) => {
    const password = sha256(data.password)
    const newdata = {
        ...data,
        user_password: password
    }
    const resp = await repo.insert(newdata)
    return {
        message: 'success',
        data: [
            {
                user_id: resp.user_id,
                user_name: data.user_name
            }
        ]
    }
}

exports.update = async (id, data) => {
    const password = sha256(data.user_password)
    const newdata = {
        ...data,
        user_password: password
    }
    return await repo.updateById(id, newdata)
}

exports.delete = async (id) => {
    return await repo.deleteById(id)
}