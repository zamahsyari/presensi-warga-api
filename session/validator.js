const { body, validationResult } = require('express-validator')

exports.sessionPost = () => {
    return [
        body('office_id').isInt().withMessage('office_id is required and should be integer'),
        body('label').exists().bail().isString().withMessage('label is required and max 255 chars'),
        body('posisi').isInt().withMessage('posisi is required and should be integer'),
    ]
}