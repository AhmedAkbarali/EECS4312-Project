const mongoose = require('mongoose');

const CallLogSchema = new mongoose.Schema({
        staff: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        time: {type: Date, default: Date.now},
        customer: {type: String, default: "no information"},
        reason: {type: String, default: "no information"},
        log: {type: String, default: "no information"},
});

module.exports = mongoose.model('Call', CallLogSchema);