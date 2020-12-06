const mongoose = require('mongoose');

const CallLogSchema = new mongoose.Schema({
        staff: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        time: {type: Date, default: Date.now},
        customer: {type: String},
        reason: {type: String},
        log: {type: String},
});

module.exports = mongoose.model('Call', CallLogSchema);