import axios from 'axios';
import {Button} from "@material-ui/core";
import React, {Component} from "react";


class RouteTest extends Component {
    state = {
        orders: [],
        orderId: ''
    }
    componentDidMount() {
        this.setState({
             orderId: "5fca09a41b31ce4d2c42e4ff"
        });
    }

    handleClick = async (e) => {
        e.preventDefault()
        let payload = {
            videos: 'movie 1',
            subtotal: '',
            shippingStatus: ''
        };

        //Add Order
        await axios.post("/api/orders",[{
        headers: {
        'Authorization': `token ${localStorage.getItem('token')}`
      }}, payload]).then(
            res => {
                console.log('added')
            }
        ).catch((error) => {
            console.log(error)
        });

        //Get all orders
        await axios.get('/api/orders').then(
          res => {console.log(res.data)}
        ).catch((error) => {
            console.log(error)
        });

        //Get order by ID
        await axios.get('/api/orders/' + this.state.orderId).then(
            res => {console.log(res.data)}
        ).catch((error) => {
            console.log(error)
        });

        //Get all of a users orders
        await axios.get('/api/orders/user/', {
            headers: {
                'Authorization': `token ${localStorage.getItem('token')}`
            }})
        .then(
            res => {console.log(res.data)}
        ).catch((error) => {
            console.log(error)
        });

        //Update Order shipping status
        await axios.post("/api/orders/update/" + this.state.orderId, {shippingStatus: ''}).then(
            () =>  console.log('Order Cancelled')
        ).catch((error) => {
            console.log(error)
        });
    }

    render() {
        return (
                <Button style={{width:'100px',height:'100px'}} variant="contained" color="primary" onClick={this.handleClick}>Add Order</Button>
        )
    }
}

export default RouteTest;