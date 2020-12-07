const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Warehouse = mongoose.model('warehouse')

router.get('/', async (req, res) => {
    const ws = await Warehouse.find({});
    res.send(ws);
});

// router.post('/create', (req, res) => {
// const {location, inventory} = req.body;
// const warehouse = new Warehouse({ location,inventory});
// warehouse.save();
// });

router.get('/inventory', (req, res) => {
    const {location} = req.body;
    
    Warehouse.findOne({location: location}).populate('inventory').then(ws => {
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

router.post('/create', (req, res) => {
    const { location } = req.body;

    Warehouse.findOne({"location": location}, (warehouse) => {
        if (warehouse)
            res.status(401).send("Warehouse already exists")
        else{
            const video_ids = Videos.find({}).map(video => video._id);
            Warehouse.create({"location": location, "iventory": video_ids});
        }
    })
});
   

router.post('/delete', (req, res) => {
    const { whId, location } = req.body

    if(location)
        Warehouse.findOneAndRemove({"location": location}, (err) => {
            if(err)
                res.status(401).send("Cannot remove the warehouse");
        });
    else if (whId)
        Warehouse.findByIdAndRemove(whId, (err) => {
            if(err)
                res.status(401).send("Cannot remove the warehouse");
        });
})

module.exports = router;