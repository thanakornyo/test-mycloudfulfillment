const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const inventory = require('./routes/api/Inventory')

const app = express()

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/inventory', inventory)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))