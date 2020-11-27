const mongoose = require('mongoose');
const { Schema } = mongoose;
const videoSchema = require('./Video');

const orderSchema =  new Schema ({
    id: String,
    videos: [videoSchema, Date],
    subtotal: Number,
    paymentStatus: String,
    shippingStatus: String
});

mongoose.model('order', orderSchema);