import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Container } from '@material-ui/core';

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
                <Grid item sm={2}>
                  <Avatar src="/broken-image.jpg" className ={classes.large} />
                </Grid>
                <Grid item sm = {4} style={{textAlign:"left"}}>
                  <p>Account Type:</p>
                  <p>Name:</p>
                  <p>E-mail:</p>
                  <p>Address:</p>
                  <p>Phone Number:</p>

                  <p>E-mail</p>
                </Grid>
                <Grid item sm={4}>
                  <p>Edit</p>
                  <p>Edit</p>
                  <p>Edit</p>
                  <p>Edit</p>
                  <p>Edit</p>
                </Grid>
              </Grid>
            </Container>
        </div>
    )
}

export default Profile
