const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// @route   GET api/inventory/test
// @desc    Tests route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Response from API'}))


module.exports = router