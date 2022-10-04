const service = require('./service')
const validator = require('./validator')
const middleware = require('../middleware')

exports.init = (app) => {
    app.get('/majlis/perwakilan', middleware.auth, async (req, res) => {
        try{
            const params = {
                per_page: req.query.per_page ? req.query.per_page : 10,
                page: req.query.page ? req.query.page : 1,
                filter: req.query.filter ? req.query.filter : [],
                sort: req.query.sort ? req.query.sort : null
            }
            const result = await service.findAllPerwakilan(params)
            res.send(result)
        }catch(e){
            console.log(e)
            if(e.status){
                res.status(e.status).json(e)
            }
            res.status(500).json(e.toString())
        }
    })

    app.get('/majlis/cabang', middleware.auth, async (req, res) => {
        try{
            const params = {
                per_page: req.query.per_page ? req.query.per_page : 10,
                page: req.query.page ? req.query.page : 1,
                filter: req.query.filter ? req.query.filter : [],
                sort: req.query.sort ? req.query.sort : null
            }
            const result = await service.findCabangByPerwakilan(req.query.perwakilan, params)
            res.send(result)
        }catch(e){
            console.log(e)
            if(e.status){
                res.status(e.status).json(e)
            }
            res.status(500).json(e.toString())
        }
    })
}