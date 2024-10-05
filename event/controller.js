const service = require('./service')
const middleware = require('../middleware')
const validator = require('./validator')

exports.init = (app) => {
    app.get('/events', middleware.auth, async (req, res) => {
        try{
            const params = {
                per_page: req.query.per_page ? req.query.per_page : 10,
                page: req.query.page ? req.query.page : 1,
                filter: req.query.filter ? req.query.filter.split(',') : [],
                sort: req.query.sort ? req.query.sort : null,
                group: req.query.group ? req.query.group : null
            }
            const result = await service.findAll(params)
            res.send(result)
        }catch(e){
            console.log(e)
            if(e.status){
                res.status(e.status).json(e)
            }
            res.status(500).json(e.toString())
        }
    })
    
    app.get('/events/:id', middleware.auth, async (req, res) => {
        try{
            const result = await service.findById(req.params.id)
            res.send(result)
        }catch(e){
            if(e.status){
                res.status(e.status).json(e)
            }
            res.status(500).json(e.toString())
        }
    })
    // admin
    app.post('/events', middleware.auth, validator.eventPost(), middleware.validate, async (req, res) => {
        try{
            const result = await service.add(req.body)
            res.send(result)
        }catch(e){
            if(e.status){
                res.status(e.status).json(e)
            }
            res.status(500).json(e.toString())
        }
    })
    app.put('/events/:id', middleware.auth, validator.eventPut(), middleware.validate, async (req, res) => {
        try{
            const result = await service.update(req.params.id, req.body)
            res.send(result)
        }catch(e){
            if(e.status){
                res.status(e.status).json(e)
            }
            res.status(500).json(e.toString())
        }
    })
    app.delete('/events/:id', middleware.auth, async (req, res) => {
        try{
            const result = await service.delete(req.params.id)
            res.send(result)
        }catch(e){
            if(e.status){
                res.status(e.status).json(e)
            }
            res.status(500).json(e.toString())
        }
    })
}