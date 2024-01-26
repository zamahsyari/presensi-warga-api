const service = require('./service')
const serviceV2 = require('./serviceV2')
const middleware = require('../middleware')
const validator = require('./validator')

exports.init = (app) => {
    app.get('/warga', middleware.auth, async (req, res) => {
        try{
            const params = {
                per_page: req.query.per_page ? req.query.per_page : 10,
                page: req.query.page ? req.query.page : 1,
                filter: req.query.filter ? req.query.filter : [],
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

    app.get('/warga/v2', middleware.auth, async (req, res) => {
        try{
            const params = {
                per_page: req.query.per_page ? req.query.per_page : 10,
                page: req.query.page ? req.query.page : 1,
                filter: req.query.filter ? req.query.filter : [],
                sort: req.query.sort ? req.query.sort : null,
                group: req.query.group ? req.query.group : null,
                q: req.query.q ? req.query.q : null,
                majlis: req.query.majlis ? req.query.majlis : null
            }
            const result = await serviceV2.findAll(params)
            res.send(result)
        }catch(e){
            console.log(e)
            if(e.status){
                res.status(e.status).json(e)
            }
            res.status(500).json(e.toString())
        }
    })
    
    app.get('/warga/:id/detail', middleware.auth, async (req, res) => {
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

    app.get('/warga/v2/:id/detail', middleware.auth, async (req, res) => {
        try{
            const result = await serviceV2.findById(req.params.id)
            res.send(result)
        }catch(e){
            if(e.status){
                res.status(e.status).json(e)
            }
            res.status(500).json(e.toString())
        }
    })
    // admin
    app.post('/warga', middleware.auth, validator.warga(), middleware.validate, async (req, res) => {
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

    app.post('/warga/v2', middleware.auth, async (req, res) => {
        try{
            const result = await serviceV2.add(req.body)
            res.send(result)
        }catch(e){
            if(e.status){
                res.status(e.status).json(e)
            }
            res.status(500).json(e.toString())
        }
    })

    app.put('/warga/:id', middleware.auth, validator.warga(), middleware.validate, async (req, res) => {
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

    app.put('/warga/v2/:id', middleware.auth, validator.warga(), middleware.validate, async (req, res) => {
        try{
            const result = await serviceV2.update(req.params.id, req.body)
            res.send(result)
        }catch(e){
            if(e.status){
                res.status(e.status).json(e)
            }
            res.status(500).json(e.toString())
        }
    })

    app.delete('/warga/:id', middleware.auth, async (req, res) => {
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

    app.delete('/warga/v2/:id', middleware.auth, async (req, res) => {
        try{
            const result = await serviceV2.delete(req.params.id)
            res.send(result)
        }catch(e){
            if(e.status){
                res.status(e.status).json(e)
            }
            res.status(500).json(e.toString())
        }
    })
}