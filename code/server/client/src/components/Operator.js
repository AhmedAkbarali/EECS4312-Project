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

    addVideoToCart = (data) => {
        if (!(this.state.videos.some(video=> video.id === data.id))){
            let temp = this.state.videos;
            temp.push(data);
            this.setState({videos: temp, counter: this.state.counter + 1});
        }
        else {
            alert("Video already exists in the Cart.")
        }
    };

    videoCoverted = (data) => {
        let tempData = []
        let currentData = data;
        currentData.map((data) => {
            tempData.push({"id": data._id, "title": data.Title, "director": data.Director, "price": data.Price, "availability": data.Availability});
        })
        return tempData;
    }

    deleteVideoFromCart = (data) => {
        let videos = this.state.videos;
        videos.splice(data, 1);
        this.setState({videos, counter: this.state.counter - 1})
    };

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

    exitCurrentCustomer= () => {
        this.setState({
            customerId: "", 
            customerName: "", 
            customerOrders: [],
            videos: [],
            counter: 0,
        });
    }

    getCustomerInfo = (event) => {
        axios.post(API_URL + 'user/get_customer', {
            phone_no: this.state.customerPhoneNum.trim(),
            pin: this.state.customerPIN.trim(),
        }).then((res) => {
            console.log(res);
            this.setState({
                customerId: res.data._id,
                customerName: res.data.first_name + " " + res.data.last_name,
                videoIds: res.data.cart,
            });

            axios.post(API_URL + 'video/get_videos_with_ids', {
                list_of_ids: res.data.cart,
            }).then((res1) => {
                console.log(res1);
                let tempData = this.videoCoverted(res1.data);
                this.setState({
                    videos: tempData,
                })
            })
        });

        
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
        // console.log(prevState.counter);
        // console.log(this.state.counter);
        // console.log(prevState.counter !== this.state.counter);

        if(prevState.counter !== this.state.counter){
            let ids = this.state.videos.map(video => video.id);
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

    render() {
        const { classes } = this.props;
        var filterData = this.state.data;

        var customerButton;

        if (this.state.text)
            filterData = filterData.filter(d => d.title.toLowerCase().indexOf(this.state.text.toLowerCase().trim()) >= 0);

        if (this.state.customerId)
            customerButton = (
                <Button 
                    color="secondary"
                    onClick={this.exitCurrentCustomer} 
                >
                    Exit Customer: {this.state.customerName} 
                </Button>
            );

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
                        <label>Order</label>
                        <Cart 
                            orderId="Order ID here" 
                            videos={this.state.videos}
                            deleteVideoFromCart={this.deleteVideoFromCart}
                        >                          
                        </Cart>
                    </div>
                </TabPanel>
                <TabPanel value={this.state.sectionIndex} index={4}>
                    <label>Remove Order(s)</label>
                </TabPanel>
        
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Operator);
