const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// models
const db = require('./app/models')

const app = express()

let whiteList = [
    'http://localhost:8081'
]

let corsOption = {
    origin: (origin, callback) => {
        if(whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    } 
}

app.use(cors(corsOption))

// parse request application/json x-www-form-urlencode
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// sync database
db.sequelize.sync()

// simple route
app.get('/', (req, res) => {
    res.json({
        message: 'welcome to gjtripay'
    })
})

// Posts routes
require('./app/routes/post.routes')(app)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`)
})