const mongoose = require('mongoose');
const { Schema } = mongoose;
const videoSchema = require('./Video');

const warehouseSchema =  new Schema ({
    location: String,
    inventory: [videoSchema]
});

mongoose.model('warehouse', warehouseSchema);