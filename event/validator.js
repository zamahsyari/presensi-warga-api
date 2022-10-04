const { body, validationResult } = require('express-validator')

exports.eventPost = () => {
    return [
        body('office_id').isInt().withMessage('office_id is required and should be integer'),
        body('name').exists().bail().isLength({max: 255}).withMessage('name is required and max 255 chars'),
        body('start_at').exists().bail().isISO8601().withMessage('start_at is required should be date'),
        body('end_at').exists().bail().isISO8601().withMessage('end_at is required and should be date'),
        body('is_active').exists().bail().isBoolean().withMessage('is_active is required and should be boolean'),
        body('description').optional().bail().isString().withMessage('description is optional and should be string'),
        body('interval').exists().bail().isIn(['SEKALI', 'HARIAN', 'MINGGUAN', 'BULANAN', 'TAHUNAN']).withMessage('interval is required and should be "SEKALI", "HARIAN", "MINGGUAN", "BULANAN", or "TAHUNAN"'),
    ]
}

exports.eventPut = () => {
    return [
        body('office_id').isInt().withMessage('office_id is required and should be integer'),
        body('name').exists().bail().isLength({max: 255}).withMessage('name is required and max 255 chars'),
        body('start_at').exists().bail().isISO8601().withMessage('start_at is required should be date'),
        body('end_at').exists().bail().isISO8601().withMessage('end_at is required and should be date'),
        body('is_active').exists().bail().isBoolean().withMessage('is_active is required and should be boolean'),
        body('description').optional().bail().isString().withMessage('description is optional and should be string')
    ]
}