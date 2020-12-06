const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Video = require('../models/Video.js')
// const db = mongoose.connection;

router.route('/all').get((req, res) => {
    Video.find((error, data) => {
        if (error) {
            return next(error);
        } 
        else {
            res.json(data);
        }
    });
})

router.route('/search').post((req, res) => {
    const {query, value} = req.body;

    // console.log(query);
    // console.log(value);

    if (value === "title"){
        Video.find({"Title": {"$regex": query, "$options": "i"}}, (error, data) => {
            if(error) {
                console.log(error);
            } 
            else {
                res.json(data);
            }
        });
    } 
    else {
        Video.find({"Director": {"$regex": query, "$options": "i"}}, (error, data) => {
            if(error) {
                console.log(error);
            } 
            else {
                res.json(data);
            }
        });
    };
})

router.route('/add').post((req, res) => {
    const {title, director, description, price, genre, availability, tier, daysRent, copy} = req.body;

    Video.findOne({Title: title, Director: director}, function (error, video) {
            if (!video) {
                Video.create({
                    Title: title,
                    Director: director,
                    Description: description,
                    Price: price, 
                    Genre: genre,
                    Availability: availability,
                    Tier: tier,
                    DaysRent: daysRent,
                    Copy: copy,
                }, (error) => {
                    console.log(error);
                });
            }
            else {
                res.status(404).send("Video already exists !!");
            }
        }
    );
})

router.route('/delete').post((req, res) => {
    const { videoId } = req.body;

    Video.findByIdAndDelete(videoId, function(error){
        if(error){
            res.status(404).send("Something goes wrong with the deletion.");
        }
    })
})

router.route('/update').post((req, res) => {
    const {videoId, title, director, description, price, genre, availability, tier, daysRent, copy} = req.body;

    Video.findByIdAndUpdate(videoId, {
        "$set": {
            "Title": title,
            "Director": director,
            "Description": description,
            "Price": price,
            "Genre": genre,
            "Availability": availability,
            "Tier": tier,
            "DaysRent": daysRent,
            "Copy": copy,
        }
    }, function(error) {
        if(error){
            res.status(404).send("Something goes wrong with the update.")
        }
    })
})

router.route("/update/video_returned").post((req, res) => {
    const { videoId } = req.body;

    Video.findByIdAndUpdate(videoId, {"$inc": {"copy": 1}}, function(err){
        if (err)
            res.status(404).send("Something goes wrong with the update of returning video.")
    });
})

router.route('/get_videos_with_ids').post((req, res) => {
    const { list_of_ids } = req.body;

    // console.log(list_of_ids);
    // var ids = list_of_ids.map(id => mongoose.Types.ObjectId(id));

    Video.find({
        '_id': {"$in": list_of_ids}
    }, function(err, videos){
        if (err)
            res.status(404).send("Can't not retrieve the user's cart");
        else
            res.json(videos);
    });
})

// router.route('/udpate_videos/copy').post()

module.exports = router;