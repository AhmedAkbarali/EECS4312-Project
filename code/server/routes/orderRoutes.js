const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Order = mongoose.model('order');

module.exports = app => {
    app.get('/api/orders', requireLogin, async (req, res) => {
        const order = await Order.find({ id: req.id });

        res.send(order);
        res.send("Order retrieved");
    });

    app.post('/api/orders', requireLogin, async (req, res) => {
        const { videos, subtotal, paymentStatus, shippingStatus } = req.body;

        const order = new Order({
           videos,
           subtotal,
           paymentStatus,
           shippingStatus
        });
        try{
            await order.save()
        } catch(err) {
            res.status(422).send(err);
        }
    });


};
