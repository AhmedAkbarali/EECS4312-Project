import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory, Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import './Register.css';
import axios from 'axios';
/*
A customer account shall contain the following information: 
the customer’s first name, last name, email address, home address, phone number, credit card information,6 digit mobile pin ,and loyalty point information

*/



function Register() {
  let history = useHistory();
  const [userData, setData] = useState({
    uemail:"",
    upassword:"",
    ufname:"",
    ulname:"",
    uaddress:"",
    uphone_no:"",
    ucc_info:"",
    upin:"",
  });

  useEffect(() => {
    axios.get("/test").then(
      response => {
        console.log(response);
      }
    )

  },[]);

  const handleChange = e => {
    const {name, value} = e.target;
    setData(prevState => ({
      ...prevState,
      [name]: value
  }));
  console.log(userData);
  }


  const handleSubmit = () => {
    axios.post("user/register",{
      email: userData.uemail,
      password: userData.upassword,
      first_name: userData.ufname,
      last_name: userData.ulname,
      address: userData.uaddress,
      phone_no: userData.uphone_no,
      cc_info: userData.ucc_info,
      six_digit_pin: userData.upin,
    })
    .then(function (response) {
      alert("Account created");
      history.push("/");
    })
    .catch(function (error) {
      alert(error.response.data);
    });


  }


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
          name="upassword"
          onChange={handleChange}
        />
        <div className="name_div">
        <TextField
            required
          id="standard-error-helper-text"
          label="First Name"
          name="ufname"
          onChange={handleChange}
        />
        <TextField
            required
          id="standard-error-helper-text"
          label="Last Name"
          name="ulname"
          onChange={handleChange}
        />
        </div>
        
        <TextField
            required
          id="standard-error-helper-text"
          label="Email Address"
          name="uemail"
          onChange={handleChange}
        />
        <TextField
            required
          id="standard-error-helper-text"
          label="Address"
          name="uaddress"
          onChange={handleChange}
        />
        <TextField
            required
          id="standard-error-helper-text"
          label="Phone Number"
          name="uphone_no"
          onChange={handleChange}
        />
        
        <TextField
            required
          id="standard-error-helper-text"
          label="Credit Card Number"
          name="ucc_info"
          onChange={handleChange}
        />
        <TextField
            required
          id="standard-error-helper-text"
          label="6-digit mobile pin"
          name="upin"
          onChange={handleChange}
        />
        <div className="reg_button_div">
        <Button onClick={handleSubmit} variant="contained" color="primary" style={{maxWidth: '200px', maxHeight: '70px', minWidth: '50px', minHeight: '50px'}}>Register</Button>
        </div>
        </form>
        </div>
    )
}

export default Register
