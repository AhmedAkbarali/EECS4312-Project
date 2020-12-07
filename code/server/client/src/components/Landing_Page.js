import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Customer_Page from './Customer_Page.js';
import Manager_Page from './Manager_Page.js';
import Operator from './Operator.js';
import Shipping_Page from './Shipper_Page.js';
import Warehouse_Page from './Warehouse_Page.js';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


function Landing_Page() {

    const [user, setUser] = useState(0);
    const [manager, setManager] = useState(0);
    const [operator, setOperator] = useState(0);
    const [shipper, setShipper] = useState(0);
    const [warehouse, setWarehouse] = useState(0);
    const [openToast, setToastOpen] = useState(false);
    const [fees, setFees] = useState(0);

    useEffect(()=>{
        axios.get("/access/customer",{
        headers: {
          'Authorization': `token ${localStorage.getItem('token')}`
        }})
        .then(response => {
            console.log(response);
            setUser(1);
            outstandingFeesCheck();
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

    const outstandingFeesCheck = () => {
        axios.get("user",{
            headers: {
            'Authorization': `token ${localStorage.getItem('token')}`
          }})
          .then(function (response) {
            console.log(response.data.outstandingFees);
            if(response.data.outstandingFees > 0) {
                setFees(response.data.outstandingFees);
                setToastOpen(true);
            }
          })
          .catch(function (error) {
            alert(error.response.data);
          });
    };
  
    // Outstanding fees.
    const handleToastClose = (event, reason) => {
      if (reason === 'clickaway') {
        //return;
      }
  
      setToastOpen(false);
    };


    if (user)
    {
        return (
            <div>
            <Customer_Page></Customer_Page>

            <Snackbar open={openToast} onClose={handleToastClose}>
            <Alert onClose={handleToastClose} severity="error">
                You have ${fees} in outstanding fees that must be paid!
            </Alert>
            </Snackbar>
            </div>
        );
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
