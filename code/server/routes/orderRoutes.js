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

    app.post('/api/orders', verifyToken, async (req, res) => {
        const { videos, subtotal } = req.body;
        const status = "preparing";

        const order = await new Order({
           user: req.userId,
           videos,
           subtotal,
           status
        });
        try{
            await order.save();
            res.send("order");
        } catch(err) {
            res.status(422).send(err);
        }
    });

    //Get users orders
    app.get('/api/orders/user', verifyToken, async (req, res) => {
        const orders = await Order.find({ user : req.userId, status: {$nin: ["cart"]}});
        res.send(orders);
    });

    //grt active orders
    app.get('/api/orders/user/active', verifyToken, async (req, res) => {
        const orders = await Order.find({ user : req.userId, status: {$nin: ["cart", "cancelled", "returned"]}});

        res.send(orders);
    });

    //Get specific order by id
    app.get('/api/orders/:orderId', async (req, res) => {
        const order = await Order.findById(req.params.orderId);

        res.send(order);
    });

    //Update specific order by id
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

};
