const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const secret = 'xxxxxxxxxxxx';


verifyToken = (req,res,next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).message({message:"No token!"}); // if there isn't any token
  
    jwt.verify(token,secret, (err, decoded) => {
        if (err) {
          return res.send("token not matched");//res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
      });
};


router.get('/customer',[verifyToken],(req,res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
          res.send({ message: err });
          return;
        }
        if (user.role == "customer")
        {
            res.send("customer");
        }
        else {
            res.send("Not auth");
        }

    })
});

router.get('/manager',verifyToken,(req,res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
          res.send({ message: err });
          return;
        }
        if (user.role == "manager")
        {
            res.send("manager");
        }
        else {
            res.send("Not auth");
        }

    })
});

router.get('/operator',verifyToken,(req,res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
          res.send({ message: err });
          return;
        }
        if (user.role == "operator")
        {
            res.send("operator");
        }
        else {
            res.send("Not auth");
        }

    })
});

router.get('/warehouse',verifyToken,(req,res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
          res.send({ message: err });
          return;
        }
        if (user.role == "warehouse")
        {
            res.send("warehouse");
        }
        else {
            res.send("Not auth");
        }

    })
});

module.exports = router;