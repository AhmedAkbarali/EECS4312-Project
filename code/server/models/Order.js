const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema =  new Schema ({
    videos: [String, Date],
    subtotal: Number,
    shippingStatus: String,
    user: String
});

mongoose.model('order', orderSchema);