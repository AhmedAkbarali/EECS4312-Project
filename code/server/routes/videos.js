const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Video = require('../models/Video.js')
// const db = mongoose.connection;

router.route('/all').get((req, res) => {
    Video.find((error, data) => {
        if (error) {
            return next(error);
        } 
        else {
            res.json(data);
        }
    });
})

router.route('/search/').post((req, res) => {
    const {query, value} = req.body;

    // console.log(query);
    // console.log(value);

    if (value === "title"){
        Video.find({"Title": {"$regex": query, "$options": "i"}}, (error, data) => {
            if(error) {
                console.log(error);
            } 
            else {
                res.json(data);
            }
        });
    } 
    else {
        Video.find({"Director": {"$regex": query, "$options": "i"}}, (error, data) => {
            if(error) {
                console.log(error);
            } 
            else {
                res.json(data);
            }
        });
    };
})

module.exports = router;