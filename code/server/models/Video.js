const mongoose = require('mongoose');
const { Schema } = mongoose;

const videoSchema =  new Schema ({
    title: String,
    director: String,
    description: String,
    price: String,
    rentalPeriod: String,
    available: Number,
    copies: Number
});

mongoose.model('video', videoSchema);