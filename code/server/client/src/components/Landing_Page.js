import React, {useEffect, useState} from 'react'
import axios from 'axios';

function Landing_Page() {

    const [user, setUser] = useState(0);

    useEffect(()=>{
        axios.get("/access/customer",{
        headers: {
          'Authorization': `token ${localStorage.getItem('token')}`
        }})
        .then(response => {
            console.log(response);
            setUser(1);
        })
        .catch(error => {
            setUser(0);
        })

    },[]);

    if (user)
    {
        return <h1>User Component</h1>;
    }
    else
    {
        return <h1>Restricted</h1>;
    }
   
}

export default Landing_Page
