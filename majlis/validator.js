const { body, validationResult } = require('express-validator')

exports.majlis = () => {
    return [
        body('office_id').isInt().withMessage('parent_majlis should be integer'),
        body('provinsi_majlis').exists().bail().isLength({max: 100}).withMessage('provinsi_majlis is required and max 100 chars'),
        body('kabupaten_majlis').exists().bail().isLength({max: 100}).withMessage('kabupaten_majlis is required and max 100 chars'),
        body('kecamatan_majlis').exists().bail().isLength({max: 100}).withMessage('kecamatan_majlis is required and max 100 chars'),
        body('lat_majlis').optional().bail().isFloat().withMessage('lat_majlis is required and should be float'),
        body('lnt_majlis').optional().bail().isFloat().withMessage('lnt_majlis is required and should be float'),
        body('nama_majlis').exists().bail().isLength({max: 100}).withMessage('nama_majlis is required and is required max 100 chars'),
        body('tanggal_peresmian_majlis').optional().bail().isDate().withMessage('tanggal_peresmian_majlis is required and should be valid date'),
        body('alamat_majlis').exists().bail().isLength({max: 255}).withMessage('alamat_majlis is required and max 255 chars'),
        body('foto_majlis').optional().bail().isLength({max: 255}).withMessage('foto_majlis is required and max 255 chars'),
        body('is_binaan').optional().bail().isBoolean().withMessage('is_binaan is required and should be boolean'),
    ]
}