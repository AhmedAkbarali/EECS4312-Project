const mongoose = require('mongoose');
const { Schema } = mongoose;
const videoSchema = require('./Video');

const warehouseSchema =  new Schema ({
    id: String,
    location: String,
    inventory: [videoSchema],
    title: String,
    price: String,
    rentalPeriod: String,
    available: Number
});

mongoose.model('warehouse', warehouseSchema);