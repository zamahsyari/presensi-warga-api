const winston = require('winston')
const now = new Date()
const formatDecimal = (val) => {
    if(val<10){
        return `0${val}`
    }
    return `${val}`
}
const nowFormat = `${now.getFullYear()}-${formatDecimal(now.getMonth() + 1)}-${formatDecimal(now.getDate())}`
const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: `./logs/error-${nowFormat}.log`, level: 'error' }),
        new winston.transports.File({ filename: `./logs/debug-${nowFormat}.log` })
    ]
})
exports.error = (e) => {
    return logger.error(e)
}
exports.log = (e) => {
    return logger.log(e)
}