import React, {useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const API_URL = "http://localhost:5000/";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');

    useEffect(()=>{
        axios.get(API_URL+"test")
        .then(response => {
            console.log(response);
        })

    },[]);
    const handleEmailChange = (e) => {
        setEmail(e.target.value)

    }
    
    const handlePassChange = (e) => {
        setPass(e.target.value);
        console.log("");
    }

    const handleLogin = () => {
        axios.post(API_URL + "user/login", {
            email,
            password
          })
          .then(response => {
            if (response.data.token) {
              localStorage.setItem("user", JSON.stringify(response.data));
              alert(response.data.token);
            }
        });
    }



    return (
        <div>
           <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          onChange={handleEmailChange}
        />
        <input
          type="password"
          name="password"
          onChange={handlePassChange}
        />
        <button type="submit">Login</button>
      </form>
    
        </div>
    )
}

export default Login
