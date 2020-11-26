import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Container, Card } from '@material-ui/core';

const useStyles =   makeStyles((theme) => ({
  large:{
    width: theme.spacing(7),
    height: theme.spacing(7),
  }
}))

function Profile() {
    const classes = useStyles();
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
                      <p>Account Type:</p>
                      <p>Name:</p>
                      <p>E-mail:</p>
                      <p>Address:</p>
                      <p>Phone Number:</p>
                      <p>Loyalty Points</p>
                      <p>Credit Card Number : XXXXXXXXXXXX</p>
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
