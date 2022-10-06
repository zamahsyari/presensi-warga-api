require('dotenv').config()
var redis = require('redis')
var client = redis.createClient({
    legacyMode: true,
    url: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}`
})
const { cli } = require('winston/lib/winston/config')

module.exports = {
    init: async () => {
        try{
            await client.connect()
        }catch(e){
            throw e
        }
    },
    get: async (key) => {
        try{
            return await client.get(key)
        }catch(e){
            throw e
        }
    },
    set: async (key, value) => {
        try{
            return await client.set(key, value)
        }catch(e){
            throw e
        }
    }
}