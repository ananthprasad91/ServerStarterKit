const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const users = require('./routes/api/users')
const app = express()

//Adding Middlewares
app.use(cors())
app.use(bodyParser.json())

const db = require("./config/keys").mongoURI

mongoose.connect(db, {useNewUrlParser:true})
     .then( ()=> console.log("Mongo DB Connected"))
     .catch( err=> console.log(err))

app.use('/api/users', users)
app.use(express.static('public'))

const port = process.env.PORT || 5000

app.listen(port , ()=> console.log("server started on port "+port))