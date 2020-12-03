const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const secret = 'xxxxxxxxxxxx';

router.post('/register', (req, res) => {
    const { email, password,first_name,last_name,address,phone_no,cc_info, role} = req.body;
    
    User.findOne({email: email}).then(user => {
    if (user)
    {
        res.status(500).send("Account already exists.");
    }
    else
    {
        const user = new User({ email, password,first_name,last_name,address,phone_no,cc_info,role});

        bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                        user
                            .save()
                            .then(user => {
                                res.json(user);
                            })
                            .catch(err => console.log(err));
                    });
                });

    }

    }); 
        
  });

  router.post('/login', (req, res) => {
    const {email, password} = req.body;
    User.findOne({email: email}).then(user => {
        if (!user)
        {
            res.status(401).send("User does not exist!");
        }
        else
        {
            bcrypt.compare(password, user.password).then((result) =>
            {
                if (!result)
                {
                    res.status(401).send("Invalid Password!");
                }
                else{
                    const token = jwt.sign({id: user.id}, secret, {
                        expiresIn: 86400
                      });
                      try{
                    User.findById(user._id, function (err, doc) {
                        if (err) { return err;}
                       doc.accessToken = token;
                       doc.save();
                       res.status(200).json({
                        data: { email: user.email, role: user.role, token: token },
                     });
                      });
                     } catch (error) {
                        console.log(error);
                     }
                }
            });
            
            
        }
  })});
  

  verifyToken = (req,res,next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.send({message:"No token!"}); // if there isn't any token
  
    jwt.verify(token,secret, (err, decoded) => {
        if (err) {
          return res.send("token not matched");//res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
      });
};

router.get('/',[verifyToken],(req,res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
          return res.status(404).send("User Not Found!");
        }
        else{
            res.status(200).json(user);
        }
})
});

router.put('/change_name',[verifyToken],(req,res) => {
    const {first_name, last_name} = req.body;
    User.findByIdAndUpdate(req.userId, {"$set": { "first_name": first_name, "last_name": last_name}}).exec(function(err,result) 
    {   
        if (err){
            res.status(200).send("user not found");
        }
        else
        {
            res.status(200).json(result);
        }

    });

});

router.put('/change_email',[verifyToken],(req,res) => {
    const {email} = req.body;
    User.findByIdAndUpdate(req.userId, {"$set": { "email": email}}).exec(function(err,result) 
    {   
        if (err){
            res.status(200).send("user not found");
        }
        else
        {
            res.status(200).json(result);
        }

    });

});

router.put('/change_address',[verifyToken],(req,res) => {
    const {address} = req.body;
    User.findByIdAndUpdate(req.userId, {"$set": { "address": address}}).exec(function(err,result) 
    {   
        if (err){
            res.status(200).send("user not found");
        }
        else
        {
            res.status(200).json(result);
        }

    });

});

router.put('/change_phone',[verifyToken],(req,res) => {
    const {phone_no} = req.body;
    User.findByIdAndUpdate(req.userId, {"$set": { "phone_no": phone_no}}).exec(function(err,result) 
    {   
        if (err){
            res.status(200).send("user not found");
        }
        else
        {
            res.status(200).json(result);
        }

    });

});

router.post('/get_customer', (req, res) => {
   const {phone_no, pin} = req.body;

   User.findOne({phone_no: phone_no, pin: pin}).exec(function(err, result){
        if (err){
            res.status(200).send("Customer not found");
        }
        else {
            res.json(result);
        }
   })
});


router.put('/pay_fees',[verifyToken],(req,res) => {
    User.findByIdAndUpdate(req.userId, {"$set": { "outstandingFees": 0}}).exec(function(err,result) 
    {   
        if (err){
            res.status(200).send("user not found");
        }
        else
        {
            res.status(200).json(result);
        }
      
    });

});


module.exports = router;