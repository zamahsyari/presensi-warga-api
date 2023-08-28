const express = require('express')
const app = express()
const port = 3000

const cors = require('cors')
const dbHelper = require('./helper/mysql')
const redisHelper = require('./helper/redis')
const userController = require('./user/controller')
const majlisController = require('./majlis/controller')
const eventController = require('./event/controller')
const presenceController = require('./presence/controller')
const wargaController = require('./warga/controller')
const sessionController = require('./session/controller')

dbHelper.init()
redisHelper.init()

app.use(cors())
app.use(express.json())

userController.init(app)
majlisController.init(app)
eventController.init(app)
presenceController.init(app)
wargaController.init(app)
sessionController.init(app)

app.get('/', (req, res) => {
  res.send('Health Check Completed')
})

app.listen(port, () => {
  console.log(`Presensi API listening on port ${port}`)
})