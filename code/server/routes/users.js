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
                    const token = jwt.sign({email}, secret, {
                        expiresIn: '1h'
                      });
                      try{
                    User.findById(user._id, function (err, doc) {
                        if (err) { return err;}
                       doc.accessToken = token;
                       doc.save();
                     });
                      res.status(200).json({
                       data: { email: user.email, role: user.role, token: user.accessToken },
                      });
                     } catch (error) {
                        console.log(error);
                     }
                }
            });
            
            
        }
  })});
  

module.exports = router;