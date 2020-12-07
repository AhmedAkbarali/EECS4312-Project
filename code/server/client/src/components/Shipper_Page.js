import React, { Component } from 'react';
import { withStyles, theme } from "@material-ui/core/styles"
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {  DialogTitle, DialogContent,DialogContentText,DialogActions,Dialog} from '@material-ui/core';
 

import axios from 'axios';

const API_URL = "http://localhost:5000/";

const styles = (theme) => ({
    root: {
      display: 'flex',
    },
    videos: {
        width: '100%',
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f7ff',
    }
  });

class Shipper_Page extends Component {

    state = {
        data: [],
        selectedOrderId: [],
        open: false,
        videos:[],
        userData: {}
    };

    columns = [
        { field: 'id', headerName: 'ID', headerAlign: 'center', width: 300},
        //{ field: 'videos', headerName: 'Videos', headerAlign: 'center', width: 500 },
        { field: 'status', headerName: 'Current Status', headerAlign: 'center', width: 400 },
        {
          field: 'changeStatus',
          headerName: 'Update Status',
          type: 'string',
          headerAlign: 'center',
          width: 400,
          renderCell: (params) => (
            <strong>
                {params.value}
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => this.setStatusToShipping(params.data)}
                >
                    Fulfilled and Shipped
                </Button>
            </strong>
          ),
        },
        {
            field: 'viewOrder',
            headerName: 'View Order',
            type: 'string',
            headerAlign: 'center',
            width: 400,
            renderCell: (params) => (
                <strong>
                    {params.value}
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ marginLeft: 16 }}
                        onClick={() => this.handleClickOpen()}
                    >
                        View Order
                    </Button>
                </strong>)
        }
    ];

     handleClickOpen = () => {
        this.setState({ open: true });
      };
    
     handleClose = () => {
        this.setState({ open: false });
      };

    handleChange = (event) => {
        // setValue(event.target.value);
        this.setState({ value: event.target.value });
      };
    
    
    handleQueryChange = (event) => {
    this.setState({ query: event.target.value });
    }

    ordersConverted = (data) => {
        let tempData = []
        let currentData = data;
        currentData.map((data) => {
            tempData.push({"id": data._id, "videos": data.videos, "status": data.status, "subtotal":data.subtotal, "user":data.user,});
        })
        return tempData;
    }

    setStatusToShipping = (data) => {
        if (data.id){
            axios.post('/api/orders/update/' + data.id, {
                status: 'shipping',
              })
              .then((response) => {
                console.log("Order '" + data.id + "' has been shipped!");
                this.componentDidMount();
              }, (error) => {
                console.log(error);
              });
        }
        else {
            alert("Could not change order status to shipping!")
        }
    };

    componentDidMount() {
        // console.log("Component Did Mount");
        axios.get(API_URL + "api/orders")
            .then(response => {
                //console.log(response);
                let tempData = this.ordersConverted(response.data);
                tempData = tempData.filter(d => d.status.includes("to-be-shipped"));
                this.setState({data: tempData});
                console.log(this.state.data);
            }).catch((error) => {
                console.log(error);
            })
    }

    render(){
        const { classes } = this.props;

        return (
            <div>
                <h1>Shipping Team</h1>
                <div style={{ height: 400, width: '100%' }}>
                <DataGrid 
                    rows={this.state.data} 
                    columns={this.columns} 
                    pageSize={5} 
                    onSelectionChange={(e) => {
                        //console.log(e);
                        this.setState({selectedOrderId: e.rowIds});
                        console.log(this.state.selectedOrderId);

                       for (var i =0; i < this.state.data.length; i++)
                       {
                         if (this.state.data[i].id === this.state.selectedOrderId[0])
                         {
                           console.log(this.state.data[i]);

                           axios.post('/video/get_videos_with_ids', {list_of_ids: this.state.data[i].videos})
                           .then(response => {
                            this.setState({videos: response.data})

                            console.log(this.state.videos);
                            console.log(this.state.data[i].user);});
                  
                            axios.post("/user/get_customer_by_id", {
                              userId: this.state.data[i].user
                            })
                            .then(response => {
                              this.setState({userData: response.data});
                            });
                           break;
                         }
                       }

                        


                    }}
                />
                </div>

            <Dialog open={this.state.open}  onClose={() => this.handleClose()} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Order Information</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <h3>User</h3>
                  <p>First Name: {this.state.userData.first_name}</p>
                  <p>Last Name:{this.state.userData.last_name}</p>
                  <p>Address: {this.state.userData.address}</p>
                  <p>Phone No: {this.state.userData.phone_no}</p>
                  <p>Email: {this.state.userData.email}</p>

                  <h3>Order:</h3>
                {this.state.videos.map((vid, index) => (
                    <p>{vid.Title} </p>
                ))}

                </DialogContentText>
                
              </DialogContent>
              <DialogActions>
                <Button onClick={() => this.handleClose()} color="primary">
                  Cancel
                </Button>
               
              </DialogActions>
            </Dialog>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Shipper_Page);
