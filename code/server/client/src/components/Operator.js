import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/styles';


import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import { InputLabel, } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';


import axios from 'axios';
import Cart from './Cart';


const styles = theme => ({
    textField: {
        margin: "4 4 4 4",
        padding: "10 10 0 0",
        width: "80%",
    },

    sectionDetail: {
        display: 'flex',
        flexDirection: 'column',
    },

    videoTable: {
        borderCollapse: 'collapse',
        width: "100%",
    },

    videoTd: {
        border: '1px solid #dddddd',
        textAlign: 'left',
        padding: "8 8 8 8",
    },

    videoTh: {
        border: '1px solid #dddddd',
        textAlign: 'left',
        padding: "8 8 8 8",
    },

    register_form: {
        display: 'flex',
        flexDirection: 'column',
        width: "80%",
    },

    name_div: {
        display: 'flex',
        flexDirection: 'row',
    },
    
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: "100%",
    },

    updateBox: {
        display: 'flex',
        flexDirection: 'column',
        width: "100%",
    },

    boxContained: {
        margin: '10 10 5, 5',
        padding: '2 2 2 2',
        width: "100%",
    },
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
TabPanel.propTypes = {
children: PropTypes.node,
index: PropTypes.any.isRequired,
value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

class Operator extends Component {

    state = {
        // text: Search by title for filtering the videos
        searchText: "",
        sectionIndex: 0,
        expanded: false,
        
        // For Call logs
        sid: "",
        isCalling: false,
        reason: "",
        customer: "",
        log: "",


        // data: collect all videos in all warehouses
        data: [],


        // Infomation related to Customer
        videos: [],
        counter: 0,
        videoIds: [],
        customerPIN: "",
        customerPhoneNum: "",
        customerId: "",
        customerName: "",
        customerOutstandingFee: false,

        // Update Customer Information
        // Based on SRS, the Operator can update these information for Customer: (Section 4.3 Requirement 3)
        /**
         * First Name
         * Last Name
         * Phone Number
         * Email
         * Home Address (address)
         */
        customerEmail: "",
        customerFName: "",
        customerLName: "",
        customerPN: "",
        customerAddress: "",

        // Call History,
        callHistory: [],
        isShowCalls: false,
        
        // Cart and Payment related 
        customerOrders: [],
        customerSubtotal: 0,
        customerLP: 0,
        customerSave: 0,
        LPspent: 0,
        isLoyaltyPointUsed: false,

        uemail:"",
        upassword:"",
        ufname:"",
        ulname:"",
        uaddress:"",
        uphone_no:"",
        upin:"",
        notification:"",
    };

    columns = [
        // { field: 'id', headerName: 'ID', width: 50},
        { field: 'title', headerName: 'Title', width: 500 },
        { field: 'director', headerName: 'Director', width: 300 },
        {
          field: 'availability',
          headerName: 'Availability',
          type: 'string',
          width: 300,
          renderCell: (params) => (
            <strong>
                {params.value}
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => this.addVideoToCart(params.data)}
                >
                    Add Cart
                </Button>
            </strong>
          ),
        },
    ];

   

    videoCoverted = (data) => {
        let tempData = []
        let currentData = data;
        currentData.map((data) => {
            tempData.push({
                "id": data._id, 
                "title": data.Title, 
                "director": data.Director, 
                "price": data.Price, 
                "availability": data.Availability, 
                "tier": data.Tier, 
                "useLP": false,
            });
        })
        return tempData;
    }

    // Cart function

    addVideoToCart = (data) => {
        if (!(this.state.videos.some(video=> video.id === data.id))){
            let temp = this.state.videos;
            temp.push(data);
            this.setState({
                videos: temp, 
                counter: this.state.counter + 1,
                customerSubtotal: this.state.customerSubtotal + data.price,
            });
        }
        else {
            alert("Video already exists in the Cart.")
        }
    };

    deleteVideoFromCart = (data) => {
        let videos = this.state.videos;
        videos.splice(videos.indexOf(data), 1);
        this.setState({
            videos, 
            counter: this.state.counter - 1,
            customerSubtotal: this.state.customerSubtotal - data.price,
        })
    };

    selectForLP = (data) => {
        if (data.useLP || this.state.customerLP >= data.price){
            this.setState({
                isLoyaltyPointUsed: !this.state.isLoyaltyPointUsed,
                customerSave: !data.useLP ? data.price : 0,
                LPspent: !data.useLP ? (data.tier === 1 ? 75 : (data.tier === 2 ? 50 : 25)) : 0,
            });
            data.useLP = !data.useLP;
        } else {
            alert("Not enough LP");
        }
    };
    // End of Cart function

    // Operator Functions


    deleteCustomerAccount = () => {
        if(this.state.customerOutstandingFee)
        {
            this.setState({notification: "Customer has to pay the outstanding fees before requesting for account deletion !!"});
        }
        else {
            axios.post('user/delete_customer_account', {
                userId: this.state.customerId,
            }).then((res) => {
                // console.log(res)
                // alert(res.data);
            });
            this.exitCurrentCustomer();
        }
       
    }
   
    exitCurrentCustomer= () => {
        this.setState({
            customerPIN: "",
            customerPhoneNum: "",
            customerId: "", 
           
            customerEmail: "",
            customerFName: "",
            customerLName: "",
            customerPN: "",
            customerAddress: "",

            customerOrders: [],
            customerLP: 0,
            customerSave: 0,
            customerSubtotal: 0,
            videos: [],
            counter: 0,
            LPspent: 0,
        });
    }

    getCustomerInfo = (event) => {

        // Validation 
        var numbers = /^[0-9]+$/;
        if (!this.state.customerPhoneNum.match(numbers)){
            alert("Invalid Phone Number");
        } else if (!this.state.customerPIN.match(numbers)){
            alert("Invalid PIN");
        } else if (this.state.customerPIN.trim().length !== 6) {
            alert("Invalid length of PIN.\nPlease enter a 6-digit PIN.");
        } else {
            axios.post('user/get_customer', {
                phone_no: this.state.customerPhoneNum.trim(),
                pin: this.state.customerPIN.trim(),
            }).then(async (res) => {
                // console.log(res);
                if (res.data){
                    this.setState({
                        customerId: res.data._id,
                        customerName: res.data.first_name  + " " + res.data.last_name,
                        videoIds: res.data.cart,
                        customerLP: res.data.loyalty_points,
                        customerOutstandingFee: res.data.outstandingFees > 0,
                    });
        
                    await axios.post('video/get_videos_with_ids', {
                        list_of_ids: res.data.cart,
                    }).then((res1) => {
                        // console.log(res1);
                        let tempData = this.videoCoverted(res1.data);
                        let c = tempData.length;
                        let t = 0;
                        tempData.forEach(data => t += data.price)
                        this.setState({
                            videos: tempData,
                            counter: c,
                            customerSubtotal: t,
                        })
                    });
        
                    await axios.post('api/orders/active', {
                        userId: res.data._id,
                    }).then((res2) => {
                        // console.log(res2);
                        this.setState({
                            customerOrders: res2.data,
                        });
                    })
                } else {
                    alert("There's no customer account with that Phone Number and PIN");
                }
                
            });
        }
    };

    customerPay = () => {
        var subtotal = this.state.customerSubtotal;
        var LP_earned = 0;
        var LP_spent = 0;
        var isLP = this.state.isLoyaltyPointUsed === true;

        if(this.state.customerOutstandingFee){
            this.setState({notification: "Customer cannot place order if there is a outstanding fee"});
        } else {
            if(this.state.isLoyaltyPointUsed){
                LP_spent = this.state.LPspent;
                LP_earned = Math.trunc(subtotal - this.state.customerSave);
            } else {
                LP_earned = Math.trunc(subtotal);
            }
    
            var videoIDs = this.state.videos.map(videos => videos.id);
    
            axios.post("/user/pay_through_operator", {
                userId: this.state.customerId,
                LP_earned: LP_earned,
                LP_spent: LP_spent,
            }).then((res) => {
                // console.log(res);
                // Reset the cart
                this.setState({
                    videos: [],
                    customerSubtotal: 0,
                    counter: 0,
                    isLoyaltyPointUsed: false,
                    customerLP: this.state.customerLP - LP_spent + LP_earned,
                });
            })
    
            axios.post("/api/orders/create", {
                userId: this.state.customerId,
                loyalty_points_used: this.state.LPspent,
                cart: videoIDs,
                subtotal: this.state.customerSubtotal - this.state.customerSave,
            }).then((res) => {
               
            });
    
            this.handleOrderRefresh();
        }
    }

    
    handleOrderRefresh = () => {
        // console.log("Order Refreshing !!");
        axios.post('api/orders/active', {
            userId: this.state.customerId,
        }).then((res2) => {
            // console.log(res2);
            this.setState({
                customerOrders: res2.data,
            });
        })
    };

    cancelOrder = async (orderId, orderLPused, orderLPtake) =>{
        await axios.post("api/orders/cancel", {
            orderId: orderId,
        }).then((res) => {
            console.log(res);
        })
        await this.handleOrderRefresh();
        await this.setState({
            customerLP: this.state.customerLP + orderLPused - orderLPtake, 
        });
    }

    handleSubmit = () => {
        if (this.state.uemail === "")
            this.setState({notification: "Invalid/Empty email."});
        else if (this.state.upassword === "")
            this.setState({notification: "Invalid/Empty password."});
        else if (this.state.ufname === "")
            this.setState({notification: "Invalid/Empty first name."});
        else if (this.state.ulname === "")
            this.setState({notification: "Invalid/Empty last name."});
        else if (this.state.uaddress === "")
            this.setState({notification: "Invalid/Empty address."});
        else if (this.state.uphone_no === "" || (!this.state.uphone_no.match( /^[0-9]+$/)))
            this.setState({notification: "Invalid/Empty phone number."});
        else if (this.state.upin === "" || (!this.state.upin.match(/^[0-9]+$/)) || this.state.upin.trim().length !== 6)
            this.setState({notification: "Invalid/Empty 6-digit pin."});
        else 
        {
            axios.post('/user/register', {
                email : this.state.uemail,
                password: this.state.upassword,
                first_name: this.state.ufname,
                last_name: this.state.ulname,
                address: this.state.uaddress,
                phone_no: this.state.uphone_no,
                six_digit_pin: this.state.upin,
            }).then((res) => {
                this.setState({
                    uemail:"",
                    upassword:"",
                    ufname:"",
                    ulname:"",
                    uaddress:"",
                    uphone_no:"",
                    upin:"",
                    errorRe:"",
                    notification: "Account created",
                });
            });
        }
    }

    updateInfo = async (event) => {
        if (this.state.customerPN && (!(this.state.customerPN.match(/^[0-9]+$/) && this.state.customerPN.trim().length === 6)))
        {
            // alert("Invalid phone number to update");
            this.setState({notification: "Invalid phone number to update"});
        } else {
            await axios.post('user/update/through_operator', {
                customerId: this.state.customerId,
                email: this.state.customerEmail,
                first_name: this.state.customerFName,
                last_name: this.state.customerLName,
                address: this.state.customerAddress,
                phone_no: this.state.customerPN,
            }).then(async (res) => {
                // Retrieve some infomation or other actions here.
                await this.setState({customerName: this.state.customerFName + " " + this.state.customerLName});
                
                await this.setState({
                    customerEmail: "",
                    customerFName: "",
                    customerLName: "",
                    customerPN: "",
                    customerAddress: "",        
                })
            });

            // await axios.post('user/get_customer/info', {
            //     customerId: this.state.customerId,
            // }).then((res1) => {
            //     if(res1.data){
            //         this.setState({
            //             customerName: res1.data.first_name + " " + res1.data.last_name,
            //         });
            //     }
            //     else {
            //         console.log(res1);
            //     }
            // });
        }
    }

    startRecord = () => {
        this.setState({isCalling: true});
        axios.post('/user/create_call_log', {staffId: this.state.sid});
    }

    showRecord = () => {
        if(!this.state.isShowCalls)
            axios.post('/user/get_call_logs', {
                staffId: this.state.sid,
            }).then((res) => {
                console.log(res);
                if (res.data){
                    this.setState({callHistory: res.data, isShowCalls: true});
                }
            })
        else{
            this.setState({isShowCalls: false});
        }
    }

    sendCallLog = () => {
        console.log("Click");
        axios.post('/user/update_call_log', {
          staffId: this.state.sid,
          reason: this.state.reason,
          customer: this.state.customer,
          log: this.state.log, 
        }).then((res) => {
            // console.log(res);
            this.setState({
                isCalling: false,
                reason: "",
                customer: "",
                log: "",
            });
        })
    }

    // End of Operator Functions

    // Class Function
    resetField = (num) => {
        if (num === 0)
            this.setState({customerEmail: ""});
        else if (num === 1)
            this.setState({customerFName: ""});
        else if (num === 2)
            this.setState({customerLName: ""});
        else if (num === 3)
            this.setState({customerAddress: ""});
        else if (num === 4)
            this.setState({customerPN: ""});
        else {
            console.log("Error in reseting field");
        }
    }

    // handleCustomerChange = (event) =>{
    //     this.setState({[event.target.name]: event.target.value, notification: ""});
    // }

    handleTextChange = (event) => {
        // event.stopPropagation();
        this.setState({[event.target.name]: event.target.value, notification: ""});
    };
  
    handleSectionChange = (event, newValue) => {
        this.setState({sectionIndex: newValue, notification: ""});
    };

    componentDidMount() {
        // console.log("Component Did Mount");
        axios.get("/user",{
            headers: {
              'Authorization': `token ${localStorage.getItem('token')}`
            }})
            .then(response => {
                // console.log(response);
                if (response.data)
                    this.setState({sid: response.data._id});
                else
                    alert("Cannot retrieve the staff ID");
            })
            .catch(error => {
                console.log(error);
            });

        axios.get("video/all")
            .then(response => {
                let tempData = this.videoCoverted(response.data);
                this.setState({data: tempData});
            }).catch((error) => {
                console.log(error);
            });
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.counter !== this.state.counter){
            let ids = []
            if (this.state.videos.length > 0)
                ids = this.state.videos.map(video => video.id);
            if (this.state.customerId){
                axios.post("user/update_user_cart", {
                    userId: this.state.customerId,
                    cartIds: ids,
                }).then((res) => {
                    // console.log(res);
                });
            };
            
        }
    }
    // End of Class Function

    render() {
        const { classes } = this.props;
        var filterData = this.state.data;

        var customerButton, cart, orders, access, notif, logForm;

        if (this.state.searchText)
            filterData = filterData.filter(d => d.title.toLowerCase().indexOf(this.state.searchText.toLowerCase().trim()) >= 0);

        // if (this.state.notification)
        notif = (
            <label color="white">{this.state.notification}</label>
        );

        if(this.state.isCalling)
            logForm = (
                <form className={classes.form}>
                    <InputLabel padding="2 2 2 2" color="primary">Customer</InputLabel>
                    <Input padding="2 2 2 2" variant="contained" name="customer" value={this.state.customer} onChange={this.handleTextChange}/>

                    <InputLabel padding="2 2 2 2" color="primary">Reason</InputLabel>
                    <Input padding="2 2 2 2" variant="contained" name="reason" value={this.state.reason} onChange={this.handleTextChange}/>

                    <InputLabel padding="2 2 2 2" color="primary">Log</InputLabel>
                    <Input padding="2 2 2 2" variant="contained" name="log" value={this.state.log} onChange={this.handleTextChange} />
        
                    <Button padding="2 2 2 2" variant="contained" color="secondary" onClick={this.sendCallLog}>End Call</Button>
                </form>
            );

        if (this.state.customerId){
            customerButton = (
                <Button 
                    color="secondary"
                    onClick={this.exitCurrentCustomer} 
                >
                    Exit Customer: {this.state.customerName} 
                </Button>
            );

            cart = (
                <Cart 
                    // userId={this.state.customerId}
                    loyalty_points={this.state.customerLP} 
                    videos={this.state.videos}
                    subtotal={this.state.customerSubtotal}
                    isLoyaltyPointUsed={this.state.isLoyaltyPointUsed}
                    customerSave={this.state.customerSave}
                    deleteVideoFromCart={this.deleteVideoFromCart}
                    selectForLP={this.selectForLP}
                    isOperator={true}
                >                          
                </Cart>
            );

            orders = this.state.customerOrders && this.state.customerOrders.map(order => (
                <tr>
                    <td>{order._id}</td>
                    <td>{order.subtotal}</td>
                    <td>{order.status}</td>
                    <td><Button color="primary" 
                            disabled={!(order.status === "preparing" || order.status === "gathering")}
                            onClick={() => this.cancelOrder(order._id, order.loyalty_points_used, order.subtotal)}
                            >Confirm</Button>
                    </td>
                </tr>
            ));

            access = (
                <div className={classes.updateBox}>
                    <label>If the customer does not want to change/update a field, press the Reset button.</label>
                    <Box className={classes.boxContained}>
                        <TextField
                            label="Update Email"
                            name="customerEmail"
                            value={this.state.customerEmail}
                            onChange={this.handleTextChange}
                        />
                        <Button color="primary" onClick={() => this.resetField(0)}>Reset</Button>
                    </Box>
                    <Box className={classes.boxContained}>
                        <TextField
                            label="Update First Name"
                            name="customerFName"
                            value={this.state.customerFName}
                            onChange={this.handleTextChange}
                        />
                       <Button color="primary" onClick={() => this.resetField(1)}>Reset</Button>
                    </Box>
                    <Box className={classes.boxContained}>
                        <TextField
                            label="Update Last Name"
                            name="customerLName"
                            value={this.state.customerLName}
                            onChange={this.handleTextChange}
                        />
                        <Button color="primary" onClick={() => this.resetField(2)}>Reset</Button>
                    </Box>
                    <Box className={classes.boxContained}>
                        <TextField
                            label="Update Address"
                            name="customerAddress"
                            value={this.state.customerAddress}
                            onChange={this.handleTextChange}
                        />
                       <Button color="primary" onClick={() => this.resetField(3)}>Reset</Button>
                    </Box>
                    <Box className={classes.boxContained}>
                        <TextField
                            label="Update Phone Number"
                            name="customerPN"
                            value={this.state.customerPN}
                            onChange={this.handleTextChange}
                        />
                        <Button color="primary" onClick={() => this.resetField(4)}>Reset</Button>
                    </Box>
                    <Button color="primary" onClick={this.updateInfo}>Update</Button>
                    <Button color="primary" onClick={this.deleteCustomerAccount}>Delete Account</Button>
                </div>    
            );
        }

        return (
            <div>
                <AppBar position="static">
                    <Tabs value={this.state.sectionIndex} onChange={this.handleSectionChange} aria-label="simple tabs example">
                        <Tab value={0} label="Call Logs" {...a11yProps(0)} />
                        <Tab value={1} label="Customer Register" {...a11yProps(1)} />
                        <Tab value={2} label="Customer Access" {...a11yProps(2)} />
                        <Tab value={3} label="Create/Update Cart" {...a11yProps(3)} />
                        <Tab value={4} label="Remove Order" {...a11yProps(4)} />
                    </Tabs>
                    {customerButton}
                    {notif}
                </AppBar>

                <TabPanel value={this.state.sectionIndex} index={0}>
                    <Button 
                        disabled={this.state.isCalling}
                        variant="contained" 
                        color="primary" 
                        style={{maxWidth: '200px', maxHeight: '70px', minWidth: '50px', minHeight: '50px'}}
                        onClick={this.startRecord}
                    >
                        Record the Call
                    </Button>
                    <Button 
                        disabled={this.state.isCalling}
                        variant="contained" 
                        color="primary" 
                        style={{maxWidth: '200px', maxHeight: '70px', minWidth: '50px', minHeight: '50px'}}
                        onClick={this.showRecord}
                    >
                        {this.state.isShowCalls ? "Exit the Call Logs" : "Show the Call Logs"}
                    </Button>
                    {logForm}
                    {this.state.isShowCalls && 
                        (
                        <Paper style={{maxHeight: 600, overflow: 'auto'}}>
                            <List height="200">
                                {this.state.callHistory && this.state.callHistory.map((call) => (
                                    <ListItem key={"call"+call._id} style={{ display: "flex", flexDirection: "column"}}>
                                        <Typography component="paragraph">Time: {call.time} </Typography>
                                        <Typography component="paragraph">Log: {call.log} </Typography>
                                        <Typography component="paragraph">Reason: {call.reason} </Typography>
                                        <Typography component="paragraph">Customer: {call.customer} </Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>)
                    }   
                    
                </TabPanel>

                <TabPanel value={this.state.sectionIndex} index={1}>
                    <Typography variant='h4' >Customer Register</Typography>
                    <form className={classes.register_form} autoComplete="off">
                        {/* {notif} */}
                        <TextField
                            required
                        id="standard-error-helper-text"
                        label="Email Address"
                        name="uemail"
                        onChange={this.handleTextChange}
                        />

                        <TextField
                            required
                        id="standard-error-helper-text"
                        label="Password"
                        helperText="Enter password"
                        name="upassword"
                        onChange={this.handleTextChange}
                        />

                        <div className={classes.name_div}>
                        <TextField
                            required
                        id="standard-error-helper-text"
                        label="First Name"
                        name="ufname"
                        onChange={this.handleTextChange}
                        />

                        <TextField
                            required
                        id="standard-error-helper-text"
                        label="Last Name"
                        name="ulname"
                        onChange={this.handleTextChange}
                        />
                        </div>

                        <TextField
                            required
                        id="standard-error-helper-text"
                        label="Address"
                        name="uaddress"
                        onChange={this.handleTextChange}
                        />

                        <TextField
                            required
                        id="standard-error-helper-text"
                        label="Phone Number"
                        name="uphone_no"
                        onChange={this.handleTextChange}
                        />

                        <TextField
                            required
                        id="standard-error-helper-text"
                        label="6-digit mobile pin"
                        name="upin"
                        onChange={this.handleTextChange}
                        />
                        <Button onClick={this.handleSubmit} variant="contained" color="primary" style={{maxWidth: '200px', maxHeight: '70px', minWidth: '50px', minHeight: '50px'}}>Register</Button>
                    </form>
                </TabPanel>
                
                <TabPanel value={this.state.sectionIndex} index={2}>
                    <label>Customer Access can access the account of the Customer and delete the account if the Customer requests</label>
                    <form className={classes.form}>
                        <FormLabel component="legend">Customer Access</FormLabel>
                        <FormControl component="fieldset">
                            <Box>
                                <label>
                                    Phone Number: <Input 
                                        // error={this.state.customerPhoneNum.match( /^[0-9]+$/)}
                                        helperText="Please enter the phone number (numbers only)"
                                        required
                                        name="customerPhoneNum"
                                        value={this.state.customerPhoneNum}
                                        disabled={this.state.customerId}
                                        onChange={this.handleTextChange}
                                    ></Input>
                                </label>
                            </Box>
                        </FormControl>
                        <FormControl component="fieldset">
                            <Box>
                                <label>
                                    PIN: <Input 
                                        // error={this.state.customerPIN.match( /^[0-9]+$/) && this.state.customerPIN.length === 6}
                                        helperText="Please enter the 6-digit PIN"
                                        required
                                        name="customerPIN"
                                        value={this.state.customerPIN}
                                        disabled={this.state.customerId}
                                        onChange={this.handleTextChange}
                                    ></Input>
                                </label>
                            </Box>
                        </FormControl>
                        <Button  
                            variant="contained"
                            color="primary"
                            size="small"
                            style={{ marginLeft: 16 }}
                            disabled={this.state.customerId}
                            onClick={this.getCustomerInfo}
                        >
                            Access
                        </Button>
                        <div>
                            {access}
                        </div>
                    </form>
                </TabPanel>
                
                <TabPanel value={this.state.sectionIndex} index={3}>
                    <TextField
                        className={classes.textField}
                        id="outlined-textarea"
                        placeholder="Enter the text to sort the title of the videos"
                        value={this.state.searchText}
                        name="searchText" 
                        multiline
                        variant="outlined"
                        label="Video Title"
                        onChange={this.handleTextChange}
                    >    
                    </TextField>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid 
                            rows={filterData} 
                            columns={this.columns} 
                            pageSize={15}
                        />
                    </div>
                    <div>
                        <label>Order:</label>
                        <Box>
                            <Button
                                variant="contained"
                                disabled={!this.state.isCalling || !this.state.customerId}
                                color="primary"
                                size="small"
                                name="paymentCreditCard"
                                style={{ marginLeft: 16 }}
                                onClick={this.customerPay}
                            >
                                Pay By Credit Card
                            </Button>
                        </Box>
                        {cart}
                    </div>
                </TabPanel>
                
                <TabPanel value={this.state.sectionIndex} index={4}>
                    <label>Remove Order(s)</label>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        name="paymentCreditCard"
                        style={{ marginLeft: 16 }}
                        onClick={this.handleOrderRefresh}
                    >
                        Refresh
                    </Button> 
                    <table width="100%">
                        <tr>
                            <th width="">OrderID</th>
                            <th>Subtotal</th>
                            <th>Status</th>
                            <th>Cancel Order</th>
                        </tr>
                        {orders}
                    </table>
                </TabPanel>
        
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Operator);
