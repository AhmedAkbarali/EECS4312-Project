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
import InputLabel from '@material-ui/core/InputLabel'

import axios from 'axios';
import Register from './Register';
import Cart from './Cart';

const API_URL = "http://localhost:5000/";

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

    form: {
        
    }
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
        text: "",
        expanded: false,
        data: [],
        videos: [],
        counter: 0,
        videoIds: [],
        tempVideos: [],
        sectionIndex: 0,
        customerPIN: "",
        customerPhoneNum: "",
        customerId:"",
        customerOrders: [],
        customerName:"",
        customerSubtotal: 0,
        customerLP: 0,
        LPspent: 0,
        isLoyaltyPointUsed: false,
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
            tempData.push({"id": data._id, "title": data.Title, "director": data.Director, "price": data.Price, "availability": data.Availability, "useLP": false});
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
                // customerLP: !data.useLP ? this.state.customerLP - data.price : this.state.customerLP + data.price,
                LPspent: !data.useLP ? data.price : 0,
            });
            data.useLP = !data.useLP;
        } else {
            alert("Not enough LP");
        }
    };
    // End of Cart function

    // Operator Functions
   
    exitCurrentCustomer= () => {
        this.setState({
            customerPIN: "",
            customerPhoneNum: "",
            customerId: "", 
            customerName: "", 
            customerOrders: [],
            customerLP: 0,
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
            axios.post(API_URL + 'user/get_customer', {
                phone_no: this.state.customerPhoneNum.trim(),
                pin: this.state.customerPIN.trim(),
            }).then(async (res) => {
                // console.log(res);
                this.setState({
                    customerId: res.data._id,
                    customerName: res.data.first_name + " " + res.data.last_name,
                    videoIds: res.data.cart,
                    customerLP: res.data.loyalty_points,
                });
    
                await axios.post(API_URL + 'video/get_videos_with_ids', {
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
    
                await axios.post('api/orders/user/active', {
                    userId: res.data._id,
                }).then((res2) => {
                    console.log(res2);
                    this.setState({
                        customerOrders: res2.data,
                    });
                })
            });
        }
    };

    customerPay = () => {
        var subtotal = this.state.customerSubtotal;
        var LP_earned = 0;
        var LP_spent = 0;
        var isLP = this.state.isLoyaltyPointUsed === true;

        if(this.state.isLoyaltyPointUsed){
            LP_spent = this.state.LPspent;
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
                customerLP: isLP ? this.state.customerLP - LP_spent : this.state.customerLP + LP_earned,
            });
        })

        axios.post("/api/orders/create", {
            userId: this.state.customerId,
            cart: videoIDs,
            subtotal: this.state.customerSubtotal - this.state.LPspent,
        });
    }

    
    handleOrderRefresh = () => {
        axios.post('api/orders/user/active', {
            userId: this.state.customerId,
        }).then((res2) => {
            // console.log(res2);
            this.setState({
                customerOrders: res2.data,
            });
        })
    };

    // End of Operator Functions

    // Class Function
    handleCustomerChange = (event) =>{
        this.setState({[event.target.name]: event.target.value});
    }

    handleTextChange = (event) => {
        // event.stopPropagation();
        this.setState({text: event.target.value});
    };
  
    handleSectionChange = (event, newValue) => {
        this.setState({sectionIndex: newValue});
    };

    componentDidMount() {
        // console.log("Component Did Mount");
        axios.get(API_URL + "video/all")
            .then(response => {
                let tempData = this.videoCoverted(response.data);
                this.setState({data: tempData});
            }).catch((error) => {
                console.log(error);
            })
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
                    console.log(res);
                });
            };
        } 
    }
    // End of Class Function

    render() {
        const { classes } = this.props;
        var filterData = this.state.data;

        var customerButton, cart, orders, updateInfo;

        if (this.state.text)
            filterData = filterData.filter(d => d.title.toLowerCase().indexOf(this.state.text.toLowerCase().trim()) >= 0);

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
                    LPspent={this.state.LPspent}
                    deleteVideoFromCart={this.deleteVideoFromCart}
                    selectForLP={this.selectForLP}
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
                            >Confirm</Button>
                    </td>
                </tr>
            ));

            // updateInfo = ();
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
                </AppBar>

                <TabPanel value={this.state.sectionIndex} index={0}>
                    <label>Call Logs</label>
                </TabPanel>
                <TabPanel value={this.state.sectionIndex} index={1}>
                    <Register></Register>
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
                                        onChange={this.handleCustomerChange}
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
                                        onChange={this.handleCustomerChange}
                                    ></Input>
                                </label>
                            </Box>
                        </FormControl>
                        <Button  
                            variant="contained"
                            color="primary"
                            size="small"
                            style={{ marginLeft: 16 }}
                            onClick={this.getCustomerInfo}
                        >
                            Access
                        </Button>
                        
                    </form>
                </TabPanel>
                <TabPanel value={this.state.sectionIndex} index={3}>
                    <TextField
                        className={classes.textField}
                        id="outlined-textarea"
                        placeholder="Enter the text to sort the title of the videos"
                        value={this.state.text} 
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
