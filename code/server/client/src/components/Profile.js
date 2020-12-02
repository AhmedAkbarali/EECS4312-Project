import React, {useEffect, useState} from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Container, Card } from '@material-ui/core';
import axios from 'axios';

const useStyles =   makeStyles((theme) => ({
  large:{
    width: theme.spacing(7),
    height: theme.spacing(7),
  }
}))

function Profile() {
    const classes = useStyles();
    const [userData, setData] = useState({
      urole:"",
      ufname:"",
      ulname:"",
      uemail:"",
      uaddress:"",
      uphone_no:"",
      ucc_info:"",
    });
/*
    useEffect(() => {
      axios.put("user/change_name",{
        first_name : "Digen",
        last_name : "Gill",
      },{headers: {
        'Authorization': `token ${localStorage.getItem('token')}`
      }})
      .then(function (response) {
        console.log(response); 
      })
      .catch(function (error) {
        alert(error.response.data);
      });
    },[]);
*/

    useEffect(() => {
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
        });
      })
      .catch(function (error) {
        alert(error.response.data);
      });
    },[]);

    

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
                      <p>Loyalty Points</p>
                      <p>Credit Card Number : {userData.ucc_info}</p>
                    </div>
                    
                  </Card>
                </Grid>
                <Grid item sm={6} container spacing = {2} direction = "column">
                  <Grid item xs = {4}>
                    <Card style = {{height:"75px"}}>
                      <Typography style={{marginTop:"25px"}}>
                        Edit user info
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs = {4}>
                    <Card style = {{height:"75px"}}>
                      <Typography style={{marginTop:"25px"}}>
                        Change e-mail
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs = {4}>
                    <Card style = {{height:"75px"}}>
                      <Typography style={{marginTop:"25px"}}>
                        Change e-mail
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
        </div>
    )
}

export default Profile
