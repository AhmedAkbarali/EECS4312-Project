const mongoose = require('mongoose');
/*
A video shall contain the following information: 
the video’s title, director's full name, description, price, genre, availability, tier, dayRent, Copy

*/
const VideoSchema = new mongoose.Schema({
    Title: { type: String, required: true,},
    Director: { type: String, required: true },
    Desription : { type: String, required: true },
    Price : { type: Number, required: true },
    Genre : { type: String, required: true },
    Availability : { type: String, required: true },
    Tier : { type: Number, required: true},
    DayRent: {type: Number, required: true},
    Copy : {type: Number, required: true},
    }, 
    {
      collection: "video",
    }
  );

module.exports = mongoose.model('Video', VideoSchema);