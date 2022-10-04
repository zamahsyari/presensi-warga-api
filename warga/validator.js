const { body, validationResult } = require('express-validator')

exports.warga = () => {
    return [
        body('office_id').isInt().withMessage('office_id is required and should be integer'),
        body('member_name').exists().bail().isLength({max: 100}).withMessage('name is required and max 255 chars'),
        body('member_ktp').exists().bail().isLength({max: 255}).withMessage('member_ktp is required and max 255 chars'),
        body('member_phone').exists().bail().isLength({max: 100}).withMessage('member_phone is required and max 100 chars'),
        body('member_gender').exists().bail().isBoolean().withMessage('member_gender is required and should be boolean'),
        body('member_mustamik').exists().bail().isBoolean().withMessage('member_mustamik is optional and should be boolean'),
        body('member_card_id').exists().bail().isString().withMessage('member_card_id is required and should be string')
    ]
}