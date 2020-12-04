const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Order = mongoose.model('order');
const User = mongoose.model('User');
const verifyToken = require('../middlewares/verifyToken');

module.exports = app => {


    //Get all orders
    app.get('/api/orders', async (req, res) => {
        const orders = await Order.find({});

        res.send(orders);
    });

    app.post('/api/orders', async (req, res) => {
        res.send('received');
        const { videos, subtotal, shippingStatus, user } = req.body;

        const order = new Order({
           videos,
           subtotal,
           shippingStatus,
           user: req.userId
        });
        try{
            await order.save();
        } catch(err) {
            res.status(422).send(err);
        }
    });

    //Get users orders
    app.get('/api/orders/user', verifyToken, async (req, res) => {
        const orders = await Order.find({ user : req.userId });
        res.send(orders);
    });

    //Get specific order by id
    app.get('/api/orders/:orderId', async (req, res) => {
        const order = await Order.findById(req.params.orderId);

        res.send(order);
    });

    //Get specific order by id
    app.put('/api/orders/update/:orderId', verifyToken, async (req, res) => {
        const order = await Order.findById(req.params.orderId);
        const { shippingStatus } = req.body;
        order.shippingStatus = shippingStatus;
        try{
            await order.save();
            res.send(order);
        } catch(err) {
            res.status(422).send(err);
        }
    });

};
