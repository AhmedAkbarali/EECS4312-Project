import React, { Component } from 'react';
import { withStyles, theme } from "@material-ui/core/styles"
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

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
                    onClick={() => this.setStatusToShipped(params.data)}
                >
                    Fulfilled and Shipped
                </Button>
            </strong>
          ),
        },
    ];

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
            tempData.push({"id": data._id, "videos": data.videos, "status": data.status, });
        })
        return tempData;
    }

    setStatusToShipped = (data) => {
        if (data.id){
            axios.post('/api/orders/update/' + data.id, {
                status: 'shipped',
              })
              .then((response) => {
                console.log("Order '" + data.id + "' has been shipped!");
                // THIS IS A GHETTO REFRESH! please have a look at this.
                this.componentDidMount();
              }, (error) => {
                console.log(error);
              });
        }
        else {
            alert("Could not change order status to shipped!")
        }
    };

    componentDidMount() {
        // console.log("Component Did Mount");
        axios.get(API_URL + "api/orders")
            .then(response => {
                //console.log(response);
                let tempData = this.ordersConverted(response.data);
                tempData = tempData.filter(d => d.status.includes("preparing"));
                this.setState({data: tempData});
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
                    }}
                />
                </div>

                <br></br>
                Current Order Information:
                <div className={classes.videos}>
                <Paper variant="outlined" elevation={4}>
                    Somehow show the videos and order details(Name, address, etc...) for the selected order#: <br></br>
                    {this.state.selectedOrderId}
                </Paper>
                </div>

            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Shipper_Page);
