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
             orderId: "5fc7e296f0c0a93314d3223b"
        });
    }

    handleClick = async (e) => {
        e.preventDefault()
        let payload = {
            videos: 'movie 1',
            subtotal: '',
            shippingStatus: '',
            user: localStorage.getItem('token')
        };

        /*Add Order
        await axios.post("/api/orders", payload).then(
            res => {
                console.log('added')
            }
        ).catch((error) => {
            console.log(error)
        });
         */

        await axios.get('/api/orders').then(
          res => {console.log(res.data)}
        ).catch((error) => {
            console.log(error)
        });

        await axios.get('/api/orders/' + this.state.orderId).then(
            res => {console.log(res.data)}
        ).catch((error) => {
            console.log(error)
        });

        await axios.get('/api/orders/user/' + payload.user).then(
            res => {console.log(res.data)}
        ).catch((error) => {
            console.log(error)
        });

        //Update Order
        await axios.put("/api/orders/update/" + this.state.orderId, {shippingStatus: ''}).then(
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