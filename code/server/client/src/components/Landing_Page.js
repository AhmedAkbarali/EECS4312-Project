import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Customer_Page from './Customer_Page.js';
function Landing_Page() {

    const [user, setUser] = useState(0);
    const [manager, setManager] = useState(0);
    const [operator, setOperator] = useState(0);
    const [shipper, setShipper] = useState(0);

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
        });
        axios.get("/access/manager",{
            headers: {
              'Authorization': `token ${localStorage.getItem('token')}`
            }})
            .then(response => {
                console.log(response);
                setManager(1);
            })
            .catch(error => {
                setManager(0);
            });
            axios.get("/access/operator",{
                headers: {
                  'Authorization': `token ${localStorage.getItem('token')}`
                }})
                .then(response => {
                    console.log(response);
                    setOperator(1);
                })
                .catch(error => {
                    setOperator(0);
                });
    },[]);

    if (user)
    {
        return <Customer_Page></Customer_Page> ;
    }
    else if (manager)
    {
    }
    else if (operator)
    {

    }
    else if (shipper)
    {

    }
    else
    {
        return <h1>Restricted</h1>;
    }
   
}

export default Landing_Page
