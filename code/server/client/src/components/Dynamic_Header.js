import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import TheatersIcon from '@material-ui/icons/Theaters';
import { Link } from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      textAlign: "left",
      flexGrow: 1,
    },
    setUserButtons: {
      marginLeft: 'auto',
      marginRight: '2rem',
    },
  }));

function Dynamic_Header() {
    const classes = useStyles();
    const [userType, setUserType] = React.useState("default");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleChange = (event) => {
      setUserType(event.target.value);
    };
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <TheatersIcon></TheatersIcon>
            <Typography variant="h6" className={classes.title}>
              VideoCo
            </Typography>

            <section className = {classes.setUserButtons}>
              <FormControl className={classes.formControl}>
              <InputLabel id="select-user">ChangeUser</InputLabel>
              <Select
                labelId="select-user-label"
                id="select-user"
                value={userType}
                onChange={handleChange}
              >
                <MenuItem value={"default"}>Default</MenuItem>
                <MenuItem value={"customer"}>Customer</MenuItem>
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"manager"}>Manager</MenuItem>
                <MenuItem value={"operator"}>Operator</MenuItem>
              </Select>
              </FormControl>
            </section>


            {(userType=== "default") && (
            <div>
            <Button component={ Link } to="/" variant="contained" color="primary">Login</Button>
            </div>
            )}

            {(userType==="customer") && (
            <div>
            <Button component={ Link } to="/search" variant="contained" color="primary">Search</Button>
            <Button component={ Link } to="/cart" variant="contained" color="primary">Cart</Button>
            </div>
            )}

            {(userType==="admin") && (
            <div>
            <Button component={ Link } to="/search" variant="contained" color="primary">Search</Button>
            <Button component={ Link } to="/" variant="contained" color="primary">AdminThings</Button>
            </div>
            )}

            {(userType==="manager") && (
            <div>
            <Button component={ Link } to="/search" variant="contained" color="primary">Search</Button>
            <Button component={ Link } to="/manager" variant="contained" color="primary">ManagerThings</Button>
            </div>
            )}

            {(userType==="operator") && (
            <div>
            <Button component={ Link } to="/search" variant="contained" color="primary">Search</Button>
            <Button component={ Link } to="/" variant="contained" color="primary">OperatorThings</Button>
            </div>
            )}

              
                <IconButton
                  aria-label="account of current user."
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>View Profile</MenuItem>
                  <MenuItem onClick={handleClose}>View History</MenuItem>
                  <br></br>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>

              
          </Toolbar>
        </AppBar>
      </div>
    );
  }

export default Dynamic_Header
