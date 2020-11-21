import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import './Register.css';
/*
A customer account shall contain the following information: 
the customer’s first name, last name, email address, home address, phone number, credit card information,6 digit mobile pin ,and loyalty point information

*/



function Register() {
    return (
        <div className="reg_div">
        <Typography variant='h4' >Customer Register</Typography>
        <form className="register_form" autoComplete="off">
            <TextField
            required
          id="standard-error-helper-text"
          label="Username"
          helperText="Enter username"
        /> 
        <TextField
            required
          id="standard-error-helper-text"
          label="Password"
          helperText="Enter password"
        />
        <div className="name_div">
        <TextField
            required
          id="standard-error-helper-text"
          label="First Name"
        />
        <TextField
            required
          id="standard-error-helper-text"
          label="Last Name"
        />
        </div>
        
        <TextField
            required
          id="standard-error-helper-text"
          label="Email Address"
        />
        <TextField
            required
          id="standard-error-helper-text"
          label="Address"
        />
        <TextField
            required
          id="standard-error-helper-text"
          label="Phone Number"
        />
        <TextField
            required
          id="standard-error-helper-text"
          label="Address"
        />
        <TextField
            required
          id="standard-error-helper-text"
          label="Credit Card Number"
        />
        <TextField
            required
          id="standard-error-helper-text"
          label="6-digit mobile pin"
        />
        <div className="reg_button_div">
        <Button variant="contained" color="primary" style={{maxWidth: '200px', maxHeight: '70px', minWidth: '50px', minHeight: '50px'}}>Register</Button>
        </div>
        </form>
        </div>
    )
}

export default Register
