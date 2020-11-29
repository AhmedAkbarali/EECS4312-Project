import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Button } from '@material-ui/core';
import Operator from './Operator.js'
function Manager_Page() {
    return (
      <div>
        <h1>Manager Component</h1>
        <Button>Add video</Button>
        <Button>Remove video</Button>
        <Button>Add warehouse</Button>
        <Button>Remove Warehouse</Button>
        <Operator/>
      </div>
    )
}

export default Manager_Page

/* const [user, setUser] = useState(0);

    useEffect(()=>{
        axios.get("access/manager",{
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
        return (
      <div>
        <h1>Manager Component</h1>
        <Button>Add video</Button>
        <Button>Remove video</Button>
        <Button>Add warehouse</Button>
        <Button>Remove Warehouse</Button>
      </div>
    )
    }
    else
    {
        return <h1>Restricted</h1>;
    }*/