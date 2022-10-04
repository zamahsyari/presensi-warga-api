const { body, validationResult } = require('express-validator')

exports.presence = () => {
    return [
        body('member_id').isInt().withMessage('member_id is required and should be integer'),
        body('event_id').isInt().withMessage('event_id is required and should be integer'),
        body('permit_type').exists().bail().isIn([0,1,2,3,4]).withMessage('permit_type is required and should be 0, 1, 2, 3, or 4'),
        body('note').optional().bail().isString().withMessage('note is optional and should be string')
    ]
}