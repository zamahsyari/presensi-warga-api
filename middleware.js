const { body, validationResult } = require('express-validator')
const logger = require('./helper/winston')
const redisHelper = require('./helper/redis')

exports.auth = async (req, res, next) => {
  const authorization = req.headers.authorization
  if(authorization == undefined){
    return res.status(401).end()
  }
  const splitted = authorization.split(' ')
  if(splitted.length < 1){
      return res.status(401).end()
  }
  const token = splitted[1]
  const check = await redisHelper.get(token)
  if(check){
      return next()
  }
  return res.status(401).end()
}

exports.validate = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        logger.error({
            request: JSON.stringify(req.body),
            error: errors.array()
        })
        return res.status(422).json({ errors: errors.array() })
    }
    return next()
}