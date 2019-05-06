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
    }
})

module.exports = InventorySchema = mongoose.model('inventory', InventorySchema)