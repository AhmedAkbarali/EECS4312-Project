import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Customer_Page from './Customer_Page.js';
import Manager_Page from './Manager_Page.js';
import Operator from './Operator.js';
import Shipping_Page from './Shipper_Page.js';
import Warehouse_Page from './Warehouse_Page.js';
function Landing_Page() {

    const [user, setUser] = useState(0);
    const [manager, setManager] = useState(0);
    const [operator, setOperator] = useState(0);
    const [shipper, setShipper] = useState(0);
    const [warehouse, setWarehouse] = useState(0);

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
        axios.get("/access/shipper",{
           headers: {
            'Authorization': `token ${localStorage.getItem('token')}`
            }})
            .then(response => {
            console.log(response);
                setShipper(1);
            })
            .catch(error => {
                setShipper(0);
            });
        axios.get("/access/warehouse",{
           headers: {
            'Authorization': `token ${localStorage.getItem('token')}`
            }})
            .then(response => {
            console.log(response);
                setWarehouse(1);
            })
            .catch(error => {
                setWarehouse(0);
            });

    },[]);

    if (user)
    {
        return <Customer_Page></Customer_Page> ;
    }
    else if (manager)
    {
        return <Manager_Page></Manager_Page>;
    }
    else if (operator)
    {
        return <Operator></Operator>;

    }
    else if (shipper)
    {
        return <Shipping_Page></Shipping_Page>;

    }
    else if (warehouse)
    {
        return <Warehouse_Page></Warehouse_Page>;
    }
    else
    {
        return <h1> </h1>;
    }
   
}

export default Landing_Page
