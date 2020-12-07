import React, { Component } from 'react';
import { withStyles, theme } from "@material-ui/core/styles"
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

class Inventory extends Component {

    state = {
        data: [],
        open: false,
        selectedVideoId: "",
        selectedVideoTitle: "",
        selectedVideoQuantity: 0,
        updatedVideoQuantity: -1,
    };

    columns = [
        { field: 'title', headerName: 'Title', headerAlign: 'center', width: 400},
        { field: 'director', headerName: 'Director', headerAlign: 'center', width: 200},
        { field: 'copy', headerName: 'Quantity', headerAlign: 'center', width: 200},
        {
          field: 'modifyQuantity',
          headerName: 'Modify Quantity',
          type: 'string',
          headerAlign: 'center',
          width: 200,
          renderCell: (params) => (
            <strong>
                {params.value}
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={() => 
                        this.handleModifyButton(params)
                    }
                >
                    Modify
                </Button>
            </strong>
          ),
        },
    ];


    handleModifyButton = (e) => {
        //console.log(e);
        this.setState({
            selectedVideoId: e.data.id,
            selectedVideoTitle: e.data.title,
            selectedVideoQuantity: e.data.copy,
        });
        this.setState({open: true});
    };

    //Dialog box functions
    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleApply = () => {
        if(this.state.updatedVideoQuantity === -1){
            console.log("qty hasn't changed")
        }else{
            //Update the quantity level
            //console.log(this.state.selectedVideoId);
            axios.post('video/update/quantity', {
                videoId: this.state.selectedVideoId,
                new_quantity: this.state.updatedVideoQuantity,
              }).then((res) => {
                console.log("qty updated")
                console.log(res);
              })
        }
        //reset updatedVideoQuantity
        this.setState({updatedVideoQuantity: -1,})
        this.setState({open: false});
        //refresh
        window.location.reload(false);
        //this.componentDidMount();
    };
    
    handleTextFieldChange = (e) =>{
        this.setState({updatedVideoQuantity: e.target.value,})
    };

    handleQueryChange = (event) => {
    this.setState({ query: event.target.value });
    }

    videoConverted = (data) => {
        let tempData = []
        let currentData = data;
        currentData.map((data) => {
            tempData.push({"id": data._id, "title": data.Title, "director": data.Director, "copy": data.Copy, "availability": data.Availability,});
        })
        return tempData;
    }

    componentDidMount() {
        //console.log("Component Did Mount");
        axios.get(API_URL + "video/all")
            .then(response => {
                //console.log(response);
                let tempData = this.videoConverted(response.data);
                this.setState({data: tempData});
                //console.log(tempData);
            }).catch((error) => {
                console.log(error);
            })
    }

    render(){
        const { classes } = this.props;

        return (
            <div>
                <h1>Inventory</h1>
                <div style={{ height: 650, width: '100%' }}>
                <DataGrid 
                    rows={this.state.data} 
                    columns={this.columns} 
                    pageSize={10} 
                    onSelectionChange={(e) => {
                        //console.log(e);
                        this.setState({selectedOrderId: e.rowIds});
                        //console.log(this.state.selectedOrderId);
                    }}
                />
                </div>

                <div>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Modify Quantity</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Title: {this.state.selectedVideoTitle}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Quantity"
                        type="number"
                        defaultValue={this.state.selectedVideoQuantity}
                        InputProps={{ inputProps: { min: 0,} }}
                        fullWidth
                        onChange={this.handleTextFieldChange}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleApply} color="primary">
                        Apply
                    </Button>
                    </DialogActions>
                </Dialog>
                </div>

            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Inventory);