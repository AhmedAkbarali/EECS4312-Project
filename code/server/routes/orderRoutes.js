const mongoose = require('mongoose');
const Order = mongoose.model('order');
const User = mongoose.model('User');
const verifyToken = require('../middlewares/verifyToken');
const Video = mongoose.model('Video');

module.exports = app => {


    //Get all orders
    app.get('/api/orders', async (req, res) => {
        const orders = await Order.find({});

        res.send(orders);
    });

    // Create orders in Customer View ?
    app.post('/api/orders', verifyToken, async (req, res) => {
        const { videos, subtotal, loyalty_points_used } = req.body;
        const status = "preparing";
        let obVideo = [];
        let rentalPeriod = 0;
        Promise.all(videos.map(async (video) => {
            obVideo.push(mongoose.Types.ObjectId(video))
            const v = await Video.findById(video)
            if(rentalPeriod == 0 || rentalPeriod > v.DaysRent) {
                rentalPeriod = v.DaysRent;
            }
        })).then(
            async () => {
                const date = new Date();
                date.setDate(date.getDate() + rentalPeriod);
                console.log(date);
                const order = await new Order({
                    user: mongoose.Types.ObjectId(req.userId),
                    videos: obVideo,
                    subtotal: subtotal,
                    status: status,
                    loyalty_points_used: loyalty_points_used,
                    returnDate: date
                });

                try{
                    await order.save();
                    res.send("order");
                } catch(err) {
                    res.status(422).send(err);
                }
            }
        )
    });

    //Get users orders
    app.get('/api/orders/user', verifyToken, async (req, res) => {
        const orders = await Order.find({ user : mongoose.Types.ObjectId(req.userId)});
        res.send(orders);
    });

    //get active orders
//   Comment for now since haven't figured how to use verifyToken in Operator view
    app.get('/api/orders/user/active', verifyToken, async (req, res) => {
        const orders = await Order.find({ user : req.userId, status: {$nin: ["cancelled", "returned"]}});

        res.send(orders);
    });

    

    app.post('/api/orders/active', async (req, res) => {
        const { userId } = req.body;

        const orders = await Order.find({ user : userId, status: {$nin: ["cancelled", "returned"]}}).populate('videos');

        res.send(orders);
    });

    // Create orders in the Operator View (don't know how to use verifyToken)
    app.post('/api/orders/create', async (req, res) => {
        const { userId, cart, subtotal, loyalty_points_used } = req.body;
        const status = "preparing";
        let obVideo = [];
        let rentalPeriod = 0;
        Promise.all(videos.map(async (video) => {
            obVideo.push(mongoose.Types.ObjectId(video))
            const v = await Video.findById(video)
            if(rentalPeriod == 0 || rentalPeriod > v.DaysRent) {
                rentalPeriod = v.DaysRent;
            }
        })).then(
            async () => {
                const date = new Date();
                date.setDate(date.getDate() + rentalPeriod);
                console.log(date);
                const order = await new Order({
                    user: mongoose.Types.ObjectId(req.userId),
                    videos: obVideo,
                    subtotal: subtotal,
                    status: status,
                    loyalty_points_used: loyalty_points_used,
                    returnDate: date
                });

                try{
                    await order.save();
                    res.send("order");
                } catch(err) {
                    res.status(422).send(err);
                }
            }
        )
    });

    //Get specific order by id
    app.get('/api/orders/:orderId', async (req, res) => {
        const order = await Order.findById(req.params.orderId);

        res.send(order);
    });

    //Update status specific order by id
    app.post('/api/orders/update/:orderId', async (req, res) => {
        const order = await Order.findById(req.params.orderId);
        const { status } = req.body;
        order.status = status;
        try{
            await order.save();
            res.send(order);
        } catch(err) {
            res.status(422).send(err);
        }
    });

    app.post('/api/orders/cancel', async (req, res) => {
       const { orderId } = req.body;

       var errorMessage;
       Order.findByIdAndUpdate(orderId, {"status": "cancelled"}, function(err, result){
            if (err)
                errorMessage += err;
            User.findByIdAndUpdate(result.user, {"$inc": {"loyalty_points": result.loyalty_points_used - result.subtotal}}, function(err1){
                if (err1)
                    res.status(404).send(errorMessage + " " + err1);
                else
                    res.send("Order Cancelation Completes");
            });
       });
    });

    app.post('/api/orders/late', verifyToken, async (req,res) => {
        let one_day = 1000 * 60 * 60 * 24;
        let lateFees = 0;
        let lateOrders = [];
        const orders = await Order.find({ user : req.userId, status: {$nin: ["cancelled", "feePaid"]}});
        Promise.all(orders.map(async (order) => {
            let did = order.status == "returned" ?
                (order.dateReturned.getTime() - order.returnDate.getTime()) / one_day
                : (Date.now() - order.returnDate.getTime()) / one_day;
            console.log(did)
            if(did > 0) {
                order.status =  (order.status == "returned" || order.status == "lateReturned") ? "lateReturned" : "lateNotReturned"
                await order.save();
                lateFees += did < 10 ? order.subtotal * (0.1 * did) : order.subtotal
                lateOrders.push(order)
            }
        })).then(
            async () => {
                await User.findByIdAndUpdate(req.userId, {outstandingFees: lateFees});
                res.send(lateOrders);
            })
    });

    app.post('/api/orders/late/videos', verifyToken, async (req, res) => {
        const { orders } = req.body;
        let videos = []
        let ids = []
        Promise.all(orders.map((order) => {
            ids.push(order.videos)
        })).then(
            () => {
                Promise.all(ids.map(async (id) => {
                    const video = await Video.findById(id);
                    videos.push(video)
                })).then(
                    () => {
                        res.send(videos);
                    }
                )
            }
            )
    });
};