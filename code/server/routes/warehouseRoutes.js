const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Warehouse = require('../models/Warehouse.js');

router.post('/create', (req, res) => {
const {location, inventory} = req.body;
const warehouse = new Warehouse({ location,inventory});
warehouse.save();
});

router.get('/inventory', (req, res) => {
    const {location} = req.body;
    
    Warehouse.findOne({location: location}).then(ws => {
        if (!ws)
        {
            res.status(401).send("Warehouse does not exist!");
        }
        else
        {
            res.status(200).json(ws.inventory);
        }
    });
    
});

//update inventory but videos have quatity on them


module.exports = router;