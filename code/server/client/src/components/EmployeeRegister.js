import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {Button, FormControlLabel, Radio, RadioGroup} from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import { useHistory, Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import './Register.css';
import axios from 'axios';
/*
A manager account shall contain the following information: the manager’s first name, last name, email address, home address, and phone number.
An operator account shall contain the following information: the operator’s first name, last name, email address, home address, and phone number.	
A warehouse  account shall contain the following information: the warehouse  first name, last name, email address, home address, phone number, and warehouse location
A shipping  account shall contain the following information: the shipping  first name, last name, email address, home address, phone number, and warehouse location.
*/



function EmployeeRegister() {
  let history = useHistory();
  const [userData, setData] = useState({
    uemail:"",
    upassword:"",
    ufname:"",
    ulname:"",
    uaddress:"",
    uphone_no:"",
    uwarehouse_location:""
  });
  const [value, setValue] = React.useState('manager');
  const [showWarehouse, setShowWarehouse] = useState(false);
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
  }

  useEffect(() => {
      if (value === "warehouse" || value === "shipping")
    {
        setShowWarehouse(true);
    }
    else{
        setShowWarehouse(false);
    }
  },[value]);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    if (value === "warehouse" || value === "shipping")
    {
      if (userData.uemail !== "" && userData.upassword !== "" && userData.ufname !== "" && userData.ulname !== "" &&userData.uaddress !== "" && userData.uphone_no !== "" && userData.uwarehouse_location!== "")
      {
      axios.post("user/register",{
        role: value,
        email: userData.uemail,
        password: userData.upassword,
        first_name: userData.ufname,
        last_name: userData.ulname,
        address: userData.uaddress,
        phone_no: userData.uphone_no,
        warehouseLocation: userData.uwarehouse_location
      })
      .then(function (response) {
        alert("Account created");
        history.push("/");
      })
      .catch(function (error) {
        alert(error.response.data);
      });
          //reset
        setData({uemail:"",
        upassword:"",
        ufname:"",
        ulname:"",
        uaddress:"",
        uphone_no:"",
        uwarehouse_location:""
        });
      setValue('manager');
      setShowWarehouse(false);
    }
    else
    {
      alert("Information fields left blank!");
    }
    }
    else
    {
      if (userData.uemail !== "" && userData.upassword !== "" && userData.ufname !== "" && userData.ulname !== "" &&userData.uaddress !== "" && userData.uphone_no !== "")
      {
        axios.post("user/register",{
          role: value,
          email: userData.uemail,
          password: userData.upassword,
          first_name: userData.ufname,
          last_name: userData.ulname,
          address: userData.uaddress,
          phone_no: userData.uphone_no,
    
        })
        .then(function (response) {
          alert("Account created");
          history.push("/");
        })
        .catch(function (error) {
          alert(error.response.data);
        });
        //reset
        setData({uemail:"",
        upassword:"",
        ufname:"",
        ulname:"",
        uaddress:"",
        uphone_no:"",
        uwarehouse_location:""
        });
      setValue('manager');
      setShowWarehouse(false);
      }
      else
      {
        alert("Information fields left blank!");
      }
    
    }
    


  }


    return (
        <div className="reg_div">
        <Typography variant='h4' >Employee Register</Typography>
        <form className="register_form" autoComplete="off">
          <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleRadioChange}>
            <FormControlLabel value="manager" control={<Radio />} label="Manager" />
            <FormControlLabel value="operator" control={<Radio />} label="Operator" />
            <FormControlLabel value="warehouse" control={<Radio />} label="Warehouse Manager" />
            <FormControlLabel value="shipper"  control={<Radio />} label="Shipping Manager" />
          </RadioGroup>
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
        {showWarehouse && (<TextField
            required
          id="standard-error-helper-text"
          label="Warehouse Location"
          name="uwarehouse_location"
          onChange={handleChange}
        />)}
        <div className="reg_button_div">
        <Button onClick={handleSubmit} variant="contained" color="primary" style={{maxWidth: '200px', maxHeight: '70px', minWidth: '50px', minHeight: '50px'}}>Register</Button>
        </div>
        </form>
        </div>
    )
}

export default EmployeeRegister
