const { body, validationResult } = require('express-validator')

exports.user = () => {
    return [
        body('user_id').exists().bail().isInt().withMessage('user_id is required and should be integer'),
        body('user_name').exists().bail().isLength({max: 100}).withMessage('user_name is required and max 100 chars'),
        body('user_password').exists().bail().isLength({min: 5}).withMessage('user_password is required and min 5 chars'),
    ]
}

exports.auth = () => {
    return [
        body('username').exists().bail().isString().withMessage('username is not valid'),
        body('password').exists().bail().isLength({min: 1}).withMessage('password min 1 chars'),
    ]
}