import React, {useEffect, useLayoutEffect, useState} from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Container, Card, Button, DialogTitle, DialogContent,DialogContentText,TextField,DialogActions,Dialog, } from '@material-ui/core';
import axios from 'axios';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles =   makeStyles((theme) => ({
  large:{
    width: theme.spacing(7),
    height: theme.spacing(7),
  }
}))

function Profile() {

    const [info, setInfo] = useState(0);
    const [active, setActive] = useState([]);
    const [history, setHistory] = useState([]);
    const [cancel, setCancel] = useState(false);

    useEffect(() => {
        setActive(rentalInfo(2));
        setHistory((rentalInfo(1)));
        setCancel(false)
    }, [cancel]);
    const classes = useStyles();
    const [userData, setData] = useState({
      urole:"",
      ufname:"",
      ulname:"",
      uemail:"",
      uaddress:"",
      uphone_no:"",
      ucc_info:"",
      uoutstandingFee:0,
      uloyaltypoints:0,
      upin:0
    });
    const [editData, setEditData] = useState({
      eemail:"",
      efname:"",
      elname:"",
      eaddress:"",
      ephone_no:"",
      ecc_info:"",
      epin:""
    });

    const handleProfileChange = e => {
      const {name, value} = e.target;
      setEditData(prevState => ({
        ...prevState,
        [name]: value
    }));
    console.log(editData);
    }



    const [edit_open, setOpen] = useState(false);
    const [userType, setType] = useState(0);


    useEffect(() => {
      console.log(editData);
      axios.get("/access/customer",{
        headers: {
          'Authorization': `token ${localStorage.getItem('token')}`
        }})
        .then(response => {
            console.log(response);
            setType(1);
        })
        .catch(error => {
            setType(0);
        });


      axios.get("user",{
        headers: {
        'Authorization': `token ${localStorage.getItem('token')}`
      }})
      .then(function (response) {
        console.log(response); 
        console.log(response.data.address); 
        setData({
          urole:response.data.role,
          ufname:response.data.first_name,
          ulname:response.data.last_name,
          uemail:response.data.email,
          uaddress:response.data.address,
          uphone_no:response.data.phone_no,
          ucc_info:response.data.cc_info,
          uoutstandingFee:response.data.outstandingFees,
          uloyaltypoints:response.data.loyalty_points,
          upin:response.data.six_digit_pin
        });
      })
      .catch(function (error) {
        alert(error.response.data);
      });
    },[]);


    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const payCharges = () => {
      axios.post("user/pay",{},{
        headers: {
        'Authorization': `token ${localStorage.getItem('token')}`
      }})
      .then(function (response) {
        console.log(response);
        setData({uoutstandingFee: response.data[0]})
      })
      .catch(function (error) {
        alert(error.response.data);
      });
    }

    const handleCancelOrder = (value) => {
        axios.post('/api/orders/cancel', {orderId: value._id}).then(
            async () => {
                await setCancel(true)
                await setInfo(0)

            }
        )
    };

    const handleSubmit = () => {
      handleClose();

      if (editData.efname !== "") {
        if (editData.elname === "") {
          editData.elname = userData.ulname;
        }
          axios.put("user/change_name",{
            first_name: editData.efname,
            last_name: editData.elname
          },{headers: {
            'Authorization': `token ${localStorage.getItem('token')}`
          }})
          .then(function (response) {
            console.log(response); 
          })
          .catch(function (error) {
            alert(error.response.data);
          });
        
      }
      if (editData.elname !== "") {
        if (editData.efname === "") {
          editData.efname = userData.ufname;
        }
          axios.put("user/change_name",{
            first_name: editData.efname,
            last_name: editData.elname
          },{headers: {
            'Authorization': `token ${localStorage.getItem('token')}`
          }})
          .then(function (response) {
            console.log(response); 
          })
          .catch(function (error) {
            alert(error.response.data);
          });
      }

      if (editData.eaddress !== "") {
        axios.put("user/change_address",{
          address: editData.eaddress
        },{headers: {
          'Authorization': `token ${localStorage.getItem('token')}`
        }})
        .then(function (response) {
          console.log(response); 
        })
        .catch(function (error) {
          alert(error.response.data);
        });
      }
      if (editData.ephone_no !== "") {
        axios.put("user/change_phone",{
          phone_no: editData.ephone_no
        },{headers: {
          'Authorization': `token ${localStorage.getItem('token')}`
        }})
        .then(function (response) {
          console.log(response); 
        })
        .catch(function (error) {
          alert(error.response.data);
        });
      }
      if (editData.eemail !== "") {
          axios.put("user/change_email",{
            email: editData.eemail
          },{headers: {
            'Authorization': `token ${localStorage.getItem('token')}`
          }})
          .then(function (response) {
            console.log(response); 
          })
          .catch(function (error) {
            alert(error.response.data);
          });
          console.log("email changed");
      }
      if (editData.epin !== "") {
        axios.put("user/change_pin",{
          six_digit_pin: editData.epin
        },{headers: {
          'Authorization': `token ${localStorage.getItem('token')}`
        }})
        .then(function (response) {
          console.log(response); 
        })
        .catch(function (error) {
          alert(error.response.data);
        });
        console.log("pin changed");
    }

      window.location.reload(false);

      setEditData({eemail:"",
      efname:"",
      elname:"",
      eaddress:"",
      ephone_no:"",
      ecc_info:"",
      epin:"",  
    });
    }

    return (
        <div>
            <Container fixed>
              <Typography component="div" 
                style={{
                  textAlign:"left", 
                  height: '10vh',
                  marginTop:"60px", 
                }}>
                <h2> User Information</h2>
              </Typography>

              <Grid container spacing={3}>
                <Grid item sm={1} >
                  <Avatar src="/broken-image.jpg" className ={classes.large} />
                  <br></br>
                  <p></p>
                </Grid>
                <Grid item sm = {4} style={{textAlign:"left"}}>
                  <Card>
                    <div style = {{marginLeft:"25px"}}>
                      <p>Account Type: {userData.urole}</p>
                      <p>Name: {userData.ufname}  {userData.ulname}</p>
                      <p>E-mail: {userData.uemail}</p>
                      <p>Address: {userData.uaddress}</p>
                      <p>Phone Number: {userData.uphone_no}</p>
                      { userType && (<div><p>Credit Card Number: {userData.ucc_info}</p>
                      <p>Pin: {userData.upin}</p>
                      <p>Loyalty Points: {userData.uloyaltypoints}</p>
                      <div><p>Outstanding Overdue Charges: {userData.uoutstandingFee}</p>
                      <Button variant="contained" color="primary" onClick={payCharges}>Pay Overdue Charges</Button>

                      </div>
                      </div>)
                      }
                    </div>
                    
                  </Card>
                </Grid>
                <Button variant="contained" color="primary" onClick={handleClickOpen}  style={{maxWidth: '200px', maxHeight: '70px', minWidth: '50px', minHeight: '50px'} }>Edit Profile</Button>

              </Grid>
              { userType && (<div>
                <Button variant="contained" color="primary"  style={{maxWidth: '200px', maxHeight: '70px', minWidth: '50px', minHeight: '50px'}} onClick={() => setInfo(1)}>Active Rentals</Button>
                <Button variant="contained" color="primary"  style={{maxWidth: '200px', maxHeight: '70px', minWidth: '50px', minHeight: '50px'}} onClick={() => setInfo(2)}>Rental History</Button>
              </div>)}
            </Container>

          <div className="rental-list">
            {info !== 0 ? <h2>Rental Information</h2> : ''}
            <List style={{display: 'grid', justifyContent: 'center', alignContent: 'center'}}>
                {info !== 0 ?
                    <ListItem
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            width: '50vw',
                            borderStyle: 'outset'
                        }}
                        key={0}
                    >
                        <ListItemText style={{width: '50px'}}>Order ID</ListItemText>
                        <ListItemText style={{width: '50px'}}>Subtotal</ListItemText>
                        <ListItemText style={{width: '50px'}}>Status</ListItemText>
                        <ListItemText style={{width: '50px'}}>Cancel</ListItemText>
                    </ListItem> : ''}
              {info === 1 ? active.map((order) => {
                  return (
                      <ListItem style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                          alignContent: 'space-between',
                          width: '50vw',
                          borderStyle: 'outset'
                      }} key={order._id}>
                          <ListItemText style={{width: '50px'}}>{order._id}</ListItemText>
                          <ListItemText style={{width: '50px'}}>{order.subtotal}</ListItemText>
                          <ListItemText style={{width: '50px'}}>{order.status}</ListItemText>
                          <ListItemText style={{width: '50px'}}>
                              {order.status == "preparing"  || order.status == "to-be-shipped" ? <Button onClick={() => {
                                  handleCancelOrder(order)
                              }}>Cancel</Button> : ''}
                          </ListItemText>

                      </ListItem>)
              }) : ''}
              {info === 2 ? history.map((order) => {
                  return (
                      <ListItem style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignContent: 'space-between',
                          width: '50vw',
                          borderStyle: 'outset'
                      }} key={order._id}>
                          <ListItemText style={{width: '50px'}}>{order._id}</ListItemText>
                          <ListItemText style={{width: '50px'}}>{order.subtotal}</ListItemText>
                          <ListItemText style={{width: '50px'}}>{order.status}</ListItemText>
                          <ListItemText style={{width: '50px'}}>
                            {order.status == "preparing"  || order.status == "to-be-shipped" ? <Button onClick={() => {handleCancelOrder(order)}}>Cancel</Button> : ''}
                          </ListItemText>
                      </ListItem>)
              }) : ''}
            </List>
          </div>

            <Dialog open={edit_open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Edit Information</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To subscribe to this website, please enter your email address here. We will send updates
                  occasionally.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  name="efname"
                  label="First Name"
                  type="text"
                  onChange={handleProfileChange}

                />
                <TextField
                  autoFocus
                  margin="dense"
                  name="elname"
                  label="Last Name"
                  type="text"
                  onChange={handleProfileChange}

                />
                <TextField
                  autoFocus
                  margin="dense"
                  name="eemail"
                  label="Email Address"
                  type="email"
                  fullWidth
                  onChange={handleProfileChange}

                />
                <TextField
                  autoFocus
                  margin="dense"
                  name="eaddress"
                  label="Address"
                  type="text"
                  fullWidth
                  onChange={handleProfileChange}

                />
                <TextField
                  autoFocus
                  margin="dense"
                  name="ephone_no"
                  label="Phone No."
                  type="text"
                  fullWidth
                  onChange={handleProfileChange}

                />
                { userType && (<div>
                  <TextField
                  autoFocus
                  margin="dense"
                  name="ecc_info"
                  label="Credit Card Number"
                  type="text"
                  fullWidth
                  onChange={handleProfileChange}
                />

                  <TextField
                  autoFocus
                  margin="dense"
                  name="epin"
                  label="6-digit Pin"
                  type="text"
                  fullWidth
                  onChange={handleProfileChange}
                />

                </div>)}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                  Change
                </Button>
              </DialogActions>
            </Dialog>
        </div>
    )
}

 function rentalInfo(props) {
    let orders = [];
    let route = '';
    if(props === 1) route = '/api/orders/user';
    else if (props === 2) route = '/api/orders/user/active';
    else return null;

    axios.get(route, {
      headers: {
        'authorization': `token ${localStorage.getItem('token')}`
      }})
    .then(
        res => {
          return (res.data).map(order => {
            return (
                orders.push(order)
            );
          })
    }).catch((error) => {
      console.log(error)
    });
    return orders;
}

export default Profile
