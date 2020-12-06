import React, {useState, useEffect} from 'react';
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
import { Link,useHistory } from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';

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
  
    const [user, setUser] = useState(false);
    const [manager, setManager] = useState(false);
    const [operator, setOperator] = useState(false);
    const [shipper, setShipper] = useState(false);
    const [warehouse, setWarehouse] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    let history = useHistory();

    useEffect(()=>{
        axios.get("/access/customer",{
        headers: {
          'Authorization': `token ${localStorage.getItem('token')}`
        }})
        .then(response => {
            console.log(response);
            setUser(true);
        })
        .catch(error => {
            setUser(false);
        });
        axios.get("/access/manager",{
            headers: {
              'Authorization': `token ${localStorage.getItem('token')}`
            }})
            .then(response => {
                console.log(response);
                setManager(true);
            })
            .catch(error => {
                setManager(false);
            });
        axios.get("/access/operator",{
           headers: {
            'Authorization': `token ${localStorage.getItem('token')}`
            }})
            .then(response => {
            console.log(response);
                setOperator(true);
            })
            .catch(error => {
                setOperator(false);
            });
        axios.get("/access/shipper",{
           headers: {
            'Authorization': `token ${localStorage.getItem('token')}`
            }})
            .then(response => {
            console.log(response);
                setShipper(true);
            })
            .catch(error => {
                setShipper(false);
            });
        axios.get("/access/warehouse",{
           headers: {
            'Authorization': `token ${localStorage.getItem('token')}`
            }})
            .then(response => {
            console.log(response);
                setWarehouse(true);
            })
            .catch(error => {
                setWarehouse(false);
            });

          if (!user && !manager && !operator && !shipper && !warehouse)
          {
            setLoggedIn(false);
          } 
          else
          {
            setLoggedIn(true);
          }

    },[user,manager,operator,shipper,warehouse]);
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleChange = (event) => {
      setUserType(event.target.value);
    };

    const handleLogout = () => {
      localStorage.removeItem('token');
      history.push("/");
      window.location.reload();

    }
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <TheatersIcon></TheatersIcon>
            <Typography variant="h6" className={classes.title}>
              VideoCo
            </Typography>
            {/*<section className = {classes.setUserButtons}>
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
                <MenuItem value={"warehouse"}>WarehouseTeam</MenuItem>
              </Select>
              </FormControl>
            </section> */}
            
           
            {user && (
            <div>
            <Button component={ Link } to="/search" variant="contained" color="primary">Search</Button>
            <Button component={ Link } to="/cart" variant="contained" color="primary">Cart</Button>

            </div>
            )}

            {manager && (
            <div>
            <Button component={ Link } to="/search" variant="contained" color="primary">Search</Button>
            <Button component={ Link } to="/manager" variant="contained" color="primary">ManagerThings</Button>
            </div>
            )}

            {operator && (
            <div>
            <Button component={ Link } to="/search" variant="contained" color="primary">Search</Button>
            <Button component={ Link } to="/" variant="contained" color="primary">OperatorThings</Button>
            </div>
            )}

            {warehouse && (
            <div>
            <Button component={ Link } to="/warehouseActiveOrders" variant="contained" color="primary">Active Orders</Button>
            <Button component={ Link } to="/warehouseInventory" variant="contained" color="primary">Inventory</Button>
            </div>
            )}
            {shipper && (
            <div>
            <Button component={ Link } to="/warehouseActiveOrders" variant="contained" color="primary">Shipper Stuff </Button>
            </div>
            )}

             {/*loggedIn && (<div>
              <Button component={ Link } to="/profile" variant="contained" color="primary">Profile</Button>
              <Button component={ Link } to="/" onClick={handleLogout} variant="contained" color="primary">Logout</Button>
            </div>
             )*/}

                      
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
                  <div><MenuItem component={ Link } to="/profile">View Profile</MenuItem>
                  <br></br>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </div>
                  
                </Menu>

              
          </Toolbar>
        </AppBar>
      </div>
    );
  }

export default Dynamic_Header
