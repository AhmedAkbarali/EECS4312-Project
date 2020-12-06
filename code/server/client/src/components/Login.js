import React, {useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { useHistory, Link } from "react-router-dom";

const API_URL = "http://localhost:5000/";

function Login() {

    const [user_email, setEmail] = useState('');
    const [password, setPass] = useState('');
    let history = useHistory();

    
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        console.log("email");

    }
    
    const handlePassChange = (e) => {
        setPass(e.target.value);
        console.log("updated pass");
    }

    const handleLogin = () => {
        axios.post(API_URL + "user/login", {
            email:user_email,
            password: password
          })
          .then(function (response) { // logged in
            alert(response.data.data.role);
            console.log(response);
            localStorage.setItem('token',response.data.data.token);
            history.push("/home");
            window.location.reload();
          })
          .catch(function (error) { // invalid login
            alert(error.response.data);
          });
    }



    return (
        <div>
        <form className="register_form" autoComplete="off">
            <TextField
            required
          id="standard-error-helper-text"
          label="Email"
          helperText="Enter email"
          onChange={handleEmailChange}
        /> 
        <TextField
            required
          type="password"
          id="standard-error-helper-text"
          label="Password"
          helperText="Enter password"
          onChange={handlePassChange}
        />
        <div className="reg_button_div">
        <Button variant="contained" color="primary" onClick={handleLogin} style={{maxWidth: '200px', maxHeight: '70px', minWidth: '50px', minHeight: '50px'} }>Login</Button>
        </div>
        </form>
        <Link to="/register">Register?</Link><br></br>
        <Link to="/eregister">Employee Register</Link>
        </div>
    )
}

export default Login
