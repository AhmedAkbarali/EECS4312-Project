const mongoose = require('mongoose');
const { Schema } = mongoose;


const orderSchema =  new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    videos: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Video',
        }
    ],
    subtotal: Number,
    loyalty_points_used: Number,
    status: 
    {
        type: String,
        default: "preparing",
        enum: ["preparing", "to-be-shipped", "shipping", "delivered", "returned", "cancelled", "late", "feePaid"],
    },
});

mongoose.model('order', orderSchema);