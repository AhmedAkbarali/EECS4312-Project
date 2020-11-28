const mongoose = require('mongoose');
/*
A video shall contain the following information: 
the video’s title, director's full name, description, price, genre, availability, tier, dayRent, Copy

*/
const VideoSchema = new mongoose.Schema({
    title: { type: String, required: true,},
    director: { type: String, required: true },
    desription : { type: String, required: true },
    price : { type: Number, required: true },
    genre : { type: String, required: true },
    availability : { type: String, required: true },
    tier : { type: Number, required: true},
    dayRent: {type: Number, required: true},
    copy : {type: Number, required: true},
  });

module.exports = mongoose.model('Video', VideoSchema);
