const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const InventorySchema = new Schema({
    packName: {
        type: String,
        required: true
    },
    packDetail: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date
    },
    price: {
        type: String
    },
    packType: {
        type: String,
        required: true
    },
    cubicCentiMeter: {
        type: Number
    },
    weight: {
        type: Number
    },
    cubicMeter:{
        type: Number
    },
    status: {
        type: String
    }
})
module.exports = Inventory = mongoose.model('inventory', InventorySchema)