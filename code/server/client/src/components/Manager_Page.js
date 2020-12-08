import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Grid, Button, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Dialog, } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Operator from './Operator.js'
import { useHistory } from 'react-router-dom';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function Manager_Page() {
  const API_URL = "http://localhost:5000/";
  let history = useHistory();

  const [videoID, setID] = useState({
    vvideoId: "",
  });
  
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

  const [warehouse, setWarehouse] = useState([]);

  useEffect(() => {
    axios.get('/warehouse')
        .then(
            (res) => {
              setWarehouse(res.data)
            }
        )
  }, []);

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

  const handleClickDelete = () => {
    setOpened(true);
  }
  const closeDelete = () => {
    setOpened(false);
  }

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
      <Button>Add warehouse</Button>
      <Button>Remove Warehouse</Button>
      <br />
      <Grid container>
        <Grid item xs={10}>
          <Operator />
        </Grid>
        <Grid item xs={2}>
          {warehouse !== [] ? warehouse.map((order) => {
            return (
                <ListItem style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignContent: 'space-between',
                  width: '30vw',
                  borderStyle: 'outset'
                }} key={order._id}>
                  <ListItemText style={{width: '50px'}}>{order.location}</ListItemText>
                </ListItem>)
          }) : ''}
        </Grid>
      </Grid>
    </div>
  )
}

export default Manager_Page
