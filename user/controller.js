const service = require('./service')
const validator = require('./validator')
const middleware = require('../middleware')

exports.init = (app) => {
    // user
    app.post('/auth/register', validator.user(), middleware.validate, async (req, res) => {
        try{
            const result = await service.register(req.body)
            res.send(result)   
        }catch(e){
            if(e.status){
                res.status(e.status).json(e)
            }
            res.status(500).json(e.toString())
        }
    })
    app.post('/auth/login', validator.auth(), middleware.validate, async (req, res) => {
        try{
            const result = await service.login(req.body)
            res.send(result)   
        }catch(e){
          console.log(e)
            if(e.status){
                return res.status(e.status).json(e)
            }
            return res.status(500).json(e.toString())
        }
    })
    // admin
    app.get('/users', middleware.auth, async (req, res) => {
        try{
            const params = {
                per_page: req.query.per_page ? req.query.per_page : 10,
                page: req.query.page ? req.query.page : 1,
                filter: req.query.filter ? req.query.filter.split(',') : [],
                sort: req.query.sort ? req.query.sort : null
            }
            const result = await service.findAll(params)
            res.send(result)
        }catch(e){
            if(e.status){
                res.status(e.status).json(e)
            }
            res.status(500).json(e.toString())
        }
    })
    app.get('/users/:id', middleware.auth, async (req, res) => {
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
    app.post('/users', middleware.auth, validator.user(), middleware.validate, async (req, res) => {
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
    app.put('/users/password/:id', middleware.auth, validator.user(), async (req, res) => {
        try{
            const result = await service.updatePassword(req.params.id, req.body)
            res.send(result)
        }catch(e){
            if(e.status){
                res.status(e.status).json(e)
            }
            res.status(500).json(e.toString())
        }
    })
    app.put('/users/office-password/:id', middleware.auth, validator.user(), async (req, res) => {
        try{
            const result = await service.updateOfficePassword(req.params.id, req.body)
            res.send(result)
        }catch(e){
            if(e.status){
                res.status(e.status).json(e)
            }
            res.status(500).json(e.toString())
        }
    })
    app.delete('/users/:id', middleware.auth, async (req, res) => {
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