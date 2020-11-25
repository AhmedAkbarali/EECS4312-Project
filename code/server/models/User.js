const mongoose = require('mongoose');
/*
A customer account shall contain the following information: 
the customer’s first name, last name, email address, home address, phone number, credit card information,6 digit mobile pin ,and loyalty point information

*/
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name : { type: String, required: true },
    last_name : { type: String, required: true },
    address : { type: String, required: true },
    phone_no : { type: String, required: true },
    cc_info : { type: String},
    role : {
      type: String,
      default: 'customer',
      enum: ['customer','manager','operator', 'warehouse']
    },
    accessToken: {
      type: String
    }
  });

module.exports = mongoose.model('User', UserSchema);
