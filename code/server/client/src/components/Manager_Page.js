import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Grid, Button, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Dialog, List, ListItem } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Operator from './Operator.js';
import { useHistory } from 'react-router-dom';

function Manager_Page() {
  const API_URL = "http://localhost:5000/";
  let history = useHistory();
 
  
  const [videoData, setData] = useState({
    vtitle: "",
    vdirector: "",
    vdescription: "",
    vprice: 0,
    vgenre: "",
    vavailability: "",
    vtier: 1,
    vdaysRent: 0,
    vcopy: 0
  });

  const [videoID, setID] = useState({
    vvideoId: "",
  });

  const [warehouseInfo, setWarehouse] = useState({
    location: "",
  });
  const [warehouseId, setWarehouseID] = useState({
    whID: "",
  });

  const [warehouses, setWarehouses] = useState([]);

  const handlewarehouseID = e =>{
    const {wId} = e.target;
    setWarehouseID({
      whID: wId,
    });
  }
  const handlewarehouseInfo = e => {
    const { value } = e.target;
    setWarehouse({
      location: value
    });
  }

  const handleInformationChange = e => {
    const { name, value } = e.target;
    setData(prevState => ({
      ...prevState,
      [name]: value
    }));
    console.log(videoData);
  }
  const handleDeleteInfo = e =>{
    const {name, value} = e.target
    setID({
      vvideoId: value
    });
  }
  const [edit_open, setOpen] = useState(false);
  const [deleteOpen, setOpened] = useState(false);
  const [addWarehouseOpen, setwarehouseOpened] = useState(false);
  const [deleteWarehouseOpen, setremoveOpened] = useState(false);
  
  const clickdeleteWarehouse = () => {
    setremoveOpened(true);
  }
  const closedeleteWarehouse = () => {
    setremoveOpened(false);
  }
  const handleWarehousedeletion = () => {
    closedeleteWarehouse();
    axios.post("warehouse/delete", {
      warehouseID : warehouseId.whID,
      location: warehouseInfo.location
    }).then(function (response) {
      console.log("Warehouse location " + warehouseInfo.location + " deleted")
    }).catch(function (error) {
      console.log("Warehouse removal failed")
    })
    setWarehouseID({
      whID: "",
      location:""
    })
  }

  const addWarehouseOpened = () => {
    setwarehouseOpened(true);
  }
  const closeaddWarehouse = () =>{
    setwarehouseOpened(false);
  }
  const handleaddWarehouse = () =>{
    closeaddWarehouse();
    axios.post(API_URL + "warehouse/create", {
      "location": warehouseInfo.location,
      "warehouseId": warehouseInfo.location,
    }).then(function(response) {
      alert("New warehouse location added")
      console.log("New warehouse location added at " + warehouseInfo.location)
    }).catch(function (error) {
      alert(error)
    })
    setWarehouse({
      location: ""
    })
  }
  const handleClickDelete = () => {
    setOpened(true);
  }
  const closeDelete = () => {
    setOpened(false);
  }

  useEffect(() =>{
    axios.get('/warehouse').then((res) => {
      if(res.data)
        setWarehouses(res.data);
      else
        console.log("Error getting all the warehouses"); 
    })
  })

  const handleDelete = () => {
    closeDelete();
    axios.post(API_URL + "video/delete", {
      videoId: videoID.vvideoId
    }).then(function (response) {
      alert("Video Deleted");
    }).catch(function (error) {
      alert(error.response.data);
    })
    setID({
      vvideoID: "",
    })
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    handleClose();
    axios.post(API_URL + "video/add", {
      title: videoData.vtitle,
      director: videoData.vdirector,
      description: videoData.vdescription,
      price: videoData.vprice,
      genre: videoData.vgenre,
      availability: videoData.vavailability,
      tier: videoData.vtier,
      daysRent: videoData.vdaysRent,
      copy: videoData.vcopy
    }).then(function (response) {
      alert("Video added");
      history.push("/");
    }).catch(function (error) {
        alert(error.response.data);
      });
    setData({
      vtitle: "",
      vdirector: "",
      vdescription: "",
      vprice: 0,
      vgenre: "",
      vavailability: "",
      vtier: 1,
      vdaysRent: 0,
      vcopy: 0,
    });
  }

  return (
    <div>
      <Typography variant="h2">Manager Component</Typography>
      <Button onClick={handleClickOpen}>Add video</Button>
      <Dialog open={edit_open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Video</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a video, fill out the information below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="vtitle"
            label="Movie Title"
            type="text"
            onChange={handleInformationChange}

          />
          <TextField
            margin="dense"
            name="vdirector"
            label="Movie Director"
            type="text"
            fullWidth
            onChange={handleInformationChange}

          />
          <TextField
            margin="dense"
            name="vdescription"
            label="Movie Description"
            type="text"
            fullWidth
            onChange={handleInformationChange}

          />
          <TextField
            margin="dense"
            name="vprice"
            label="Price"
            type="text"
            fullWidth
            onChange={handleInformationChange}

          />
          <TextField
            margin="dense"
            name="vgenre"
            label="Genre"
            type="text"
            fullWidth
            onChange={handleInformationChange}

          />
          <TextField
            margin="dense"
            name="vavailability"
            label="Availability"
            type="text"
            fullWidth
            onChange={handleInformationChange}

          />
          <TextField
            margin="dense"
            name="vtier"
            label="Tier"
            type="text"
            fullWidth
            onChange={handleInformationChange}

          />
          <TextField
            margin="dense"
            name="vdaysRent"
            label="Days rented"
            type="text"
            fullWidth
            onChange={handleInformationChange}

          />
          <TextField
            margin="dense"
            name="vcopy"
            label="Number of copies"
            type="text"
            fullWidth
            onChange={handleInformationChange}

          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Video
          </Button>
        </DialogActions>
      </Dialog>
      <Button onClick={handleClickDelete}>Remove video</Button>
      <Dialog open={deleteOpen} onClose={closeDelete} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Video</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To delete a video enter it's videoId
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="vvideoId"
            label="Video ID"
            type="text"
            onChange={handleDeleteInfo}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete Video
          </Button>
        </DialogActions>
      </Dialog>
      <Button onClick={addWarehouseOpened}>Add warehouse</Button>
      <Dialog open={addWarehouseOpen} onClose={closeaddWarehouse} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Warehouse</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter location for new warehouse
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="location"
            label="Warehouse Location"
            type="text"
            fullWidth
            onChange={handlewarehouseInfo}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeaddWarehouse} color="primary">
            Cancel
          </Button>
          <Button onClick={handleaddWarehouse} color="primary">
            Add warehouse
          </Button>
        </DialogActions>
      </Dialog>
      <Button onClick={clickdeleteWarehouse}>Remove Warehouse</Button>
      <Dialog open={deleteWarehouseOpen} onClose={closedeleteWarehouse} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Warehouse</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter ID or location of warehouse to be deleted
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="whID"
            label="Warehouse ID"
            type="text"
            fullWidth
            onChange={handlewarehouseID}

          />
          <TextField
          autoFocus
          margin="dense"
          name="location"
          label="Warehouse Location"
          type="text"
          fullWidth
          onChange={handlewarehouseInfo}

        />
        </DialogContent>
        <DialogActions>
          <Button onClick={closedeleteWarehouse} color="primary">
            Cancel
          </Button>
          <Button onClick={handleWarehousedeletion} color="primary">
            Delete warehouse
          </Button>
        </DialogActions>
      </Dialog>
      <br />
      <Grid container>
        <Grid item xs={10}>
          <Operator />
        </Grid>
        <Grid item xs={2}>
          {/* <p> list of warehouses can go here</p>
           */}
           <List style={{display: "flex", overflow: "scroll", height: 600}}>
              {warehouses && warehouses.map((house) => {
                <ListItem>
                  <Typography component="h2">{house.location}</Typography>
                </ListItem>
              })}
           </List>
        </Grid>
      </Grid>
    </div>
  )
}

export default Manager_Page
