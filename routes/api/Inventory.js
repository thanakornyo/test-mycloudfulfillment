const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Import model inventory
const Inventory = require('../../models/Inventory')

// Import function
const utils = require('../../utils/fnc')

// @route   GET api/inventory/test
// @desc    Tests route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Response from API'}))

// @route   POST api/inventory
// @desc    Create order list
// @access  Public
router.post('/', (req, res) => {
    // Validatation Data

    // if(!isValid){
    //      ** if data not pass
    //      return res.status(400).json(errors)
    //}

    if(true){
        // If data is clear

        const newOrder = new Inventory({
            packName: req.body.packName, 
            packDetail: req.body.packDetail,
            packType: req.body.packType,
            cubicCentiMeter: req.body.cubicCentiMeter,
            cubicMeter: req.body.cubicMeter,
            price: 0,
            status: 'deposited'
        })

        // If not have weight
        if(newOrder.packType === 'clothes'){
            newOrder.weight = req.body.weight !== undefined ? req.body.weight : 0
        }

        newOrder.save().then(order => res.json(order))
    }
})

// @route   GET api/inventory
// @desc    Get all list inventory
// @access  Public
router.get('/', (req, res) => {
    Inventory.find()
        .sort({ date: -1 })
        .then(orders => {
            let orderList = orders.map(order => {
                if(order.price == 0){
                    order.endDate = new Date
                    order.price = utils.calculatePrice(order)
                }
                return order
            })

            res.json(orderList)
        })
        .catch(err => res.status(404).json({ notfound: 'No order list found' }));
})

// @route   GET api/inventory/:id
// @desc    Get inventory order by id
// @access  Public
router.get('/:id', (req, res) => {
    Inventory.findById(req.params.id)
        .then(orders => res.json(orders))
        .catch(err =>
            res.status(404).json({ notfound: 'No order list with that ID' })
    )
})

// @route   GET api/inventory/checkout
// @desc    Check out order
// @access  Public
router.get('/checkout/:id', (req, res) => {
    // Find by ID
    Inventory.findById(req.params.id)
        .then(order => {
            // Add check out date
            order.endDate = new Date
            // Add finally price
            let price = utils.calculatePrice(order)
            order.price = price
            // Stamp status to checkout
            order.status = 'checkout'

            order.save().then(response => res.json(response))
        })
        .catch(err =>
            res.status(404).json({ notfound: 'No order list with that ID' })
    )
})

module.exports = router