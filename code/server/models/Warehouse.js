const mongoose = require('mongoose');
const { Schema } = mongoose;
const videoSchema = require('./Video');

const warehouseSchema =  new Schema ({
    location: {type: String, unique: true},
    inventory: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Video',
        }
    ]
});

mongoose.model('warehouse', warehouseSchema);