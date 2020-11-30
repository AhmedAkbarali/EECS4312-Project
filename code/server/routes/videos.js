const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Video = require('../models/Video.js')
// const db = mongoose.connection;

router.route('/all').get((req, res) => {
    Video.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

module.exports = router;