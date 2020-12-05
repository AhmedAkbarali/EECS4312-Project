const mongoose = require('mongoose');
const { Schema } = mongoose;


const orderSchema =  new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    videos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video',
        }
    ],
    subtotal: Number,
    status: 
    {
        type: String,
        default: "preparing",
        enum: ["preparing", "gathering", "shipped", "received", "returned", "cancelled"],
    },
});

mongoose.model('order', orderSchema);