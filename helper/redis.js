require('dotenv').config()
var redis = require('redis')
var client = redis.createClient({
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD
})
const { cli } = require('winston/lib/winston/config')

module.exports = {
    init: async () => { await client.connect() },
    get: async (key) => {
        return await client.get(key)
    },
    set: async (key, value) => {
        return await client.set(key, value)
    }
}