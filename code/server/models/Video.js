const mongoose = require('mongoose');
/*
A video shall contain the following information: 
the video’s title, director's full name, description, price, genre, availability, tier, dayRent, Copy

Video with tier and price range (CAD):
Tier 3:     3       -     13 
Tier 2:     13.25   -     25
Tier 1:     25.25   -     40

*/
const VideoSchema = new mongoose.Schema({
    Title: { type: String, required: true,},
    Director: { type: String, required: true },
    Desription : { type: String, required: true },
    Price : { type: Number, required: true },
    Genre : { type: String, required: true },
    Availability : { type: String, required: true },
    Tier : { type: Number, required: true},
    DaysRent: {type: Number, required: true},
    Copy : {type: Number, required: true},
    }, 
    {
      collection: "videos",
    }
  );

module.exports = mongoose.model('Video', VideoSchema);