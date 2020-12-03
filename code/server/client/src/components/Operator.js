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
});

// const columns = [
//     // { field: 'id', headerName: 'ID', width: 50},
//     { field: 'title', headerName: 'Title', width: 500 },
//     { field: 'director', headerName: 'Director', width: 300 },
//     {
//       field: 'availability',
//       headerName: 'Availability',
//       type: 'string',
//       width: 300,
//       renderCell: (params) => (
//         <strong>
//             {params.value}
//             <Button
//                 variant="contained"
//                 color="primary"
//                 size="small"
//                 style={{ marginLeft: 16 }}
//                 onClick={() => {console.log(params)}}
//             >
//                 Add Cart
//             </Button>
//         </strong>
//       ),
//     },
// ];


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

// const data_sample = [
//     {"id": 1, "title":"Leader Of Our Future","director":"Girard Nicolette","description": "Description 1. Description 2. Description 3","price": 10.25,"genre":"science fiction","availability":"yes","tier":3,"dayRent":35,"Copy":17},
//     {"id": 2, "title":"Leader Of Our Future","director":"Girard Nicolette","description": "Description 1. Description 2. Description 3","price": 5.25,"genre":"science fiction","availability":"yes","tier":3,"dayRent":35,"Copy":17},
//     {"id": 3, "title":"Leader Of Our Future","director":"Girard Nicolette","description": "Description 1. Description 2. Description 3","price": 4.25,"genre":"science fiction","availability":"yes","tier":3,"dayRent":35,"Copy":17},
//     {"id": 4, "title":"Leader Of Our Future","director":"Girard Nicolette","description": "Description 1. Description 2. Description 3","price": 15.25,"genre":"science fiction","availability":"yes","tier":3,"dayRent":35,"Copy":17},
//     {"id": 5, "title":"Leader Of Our Future","director":"Girard Nicolette","description": "Description 1. Description 2. Description 3","price": 20.25,"genre":"science fiction","availability":"yes","tier":3,"dayRent":35,"Copy":17},
//     {"id": 6, "title":"Leader Of Our Future","director":"Girard Nicolette","description": "Description 1. Description 2. Description 3","price": 4.25,"genre":"science fiction","availability":"yes","tier":3,"dayRent":35,"Copy":17},
//     {"id": 7, "title":"Leader Of Our Future","director":"Girard Nicolette","description": "Description 1. Description 2. Description 3","price": 3.25,"genre":"science fiction","availability":"yes","tier":3,"dayRent":35,"Copy":17},
//     {"id": 8, "title":"Leader Of Our Future","director":"Girard Nicolette","description": "Description 1. Description 2. Description 3","price": 9.25,"genre":"science fiction","availability":"yes","tier":3,"dayRent":35,"Copy":17},
//     {"id": 9, "title":"Leader Of Our Future","director":"Girard Nicolette","description": "Description 1. Description 2. Description 3","price": 29.25,"genre":"science fiction","availability":"yes","tier":3,"dayRent":35,"Copy":17},
//     {"id": 10, "title":"Leader Of Our Future","director":"Girard Nicolette","description": "Description 1. Description 2. Description 3","price": 11.25,"genre":"science fiction","availability":"yes","tier":3,"dayRent":35,"Copy":17},
//     {"id": 11, "title":"Leader Of Our Future","director":"Girard Nicolette","description": "Description 1. Description 2. Description 3","price": 12.25,"genre":"science fiction","availability":"yes","tier":3,"dayRent":35,"Copy":17},
//     {"id": 12, "title":"Leader Of Our Future","director":"Girard Nicolette","description": "Description 1. Description 2. Description 3","price": 6.25,"genre":"science fiction","availability":"yes","tier":3,"dayRent":35,"Copy":17}
// ];

class Operator extends Component {

    state = {
        text: "",
        expanded: false,
        data: [],
        videos: [],
        tempVideos: [],
        sectionIndex: 0,
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
            this.setState({videos: temp});
        }
        else {
            alert("Video already exists in the Cart.")
        }
    }

    deleteVideoFromCart = (data) => {
        let videos = this.state.videos;
        videos.splice(data, 1);
        this.setState({videos})
    }

    handleTextChange = (event) => {
        // event.stopPropagation();
        this.setState({text: event.target.value});
    };

    // handleSectionChange = (panel) => (event, isExpanded) => {
    //     this.setState({expanded: isExpanded ? panel : false});
    // };
  
    handleSectionChange = (event, newValue) => {
        this.setState({sectionIndex: newValue});
    }

    componentDidMount() {
        // console.log("Component Did Mount");
        axios.get(API_URL + "video/all")
            .then(response => {
                let tempData = []
                let currentData = response.data;
                // var idCreators = 1;
                currentData.map((data) => {
                    tempData.push({"id": data._id, "title": data.Title, "director": data.Director, "price": data.Price, "availability": data.Availability});
                    // idCreators = idCreators + 1;
                })
                this.setState({data: tempData});
            }).catch((error) => {
                console.log(error);
            })
    }

    // componentDidUpdate(){
    //     console.log("The text get updated: " + this.state.text);
    // }

    render() {
        const { classes } = this.props;
        var filterData = this.state.data;

        if (this.state.text)
            filterData = filterData.filter(d => d.title.toLowerCase().indexOf(this.state.text.toLowerCase().trim()) >= 0);

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
                </AppBar>

                <TabPanel value={this.state.sectionIndex} index={0}>
                    <label>Call Logs</label>
                </TabPanel>
                <TabPanel value={this.state.sectionIndex} index={1}>
                    <Register></Register>
                </TabPanel>
                <TabPanel value={this.state.sectionIndex} index={2}>
                    <label>Customer Access can access the account of the Customer and delete the account if the Customer requests</label>
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
