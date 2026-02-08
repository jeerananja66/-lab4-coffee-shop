const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('./routes')(app)

require('./userPassport')
require('./routes')(app)

const config = require('./config/config')

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`)
})
