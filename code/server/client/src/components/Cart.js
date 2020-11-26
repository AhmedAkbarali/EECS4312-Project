import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import '../style/Cart.css';
import { Link } from 'react-router-dom';

const CART_LIST = [
    {name: '0',price: '10'},
    {name: '1',price: '10'},
    {name: '2',price: '10'},
    {name: 'Superlongtestname for testing purposes and also testing',price: '10'},
    {name: '1',price: '10'},
    {name: '2',price: '10'},
    {name: '0',price: '10'},
    {name: '1',price: '10'}
];

let subtotal = 0;

function Cart() {

    return (
        <div >
            <h1 className="your-cart">Your Cart</h1>
            <div className="cart">
                <div className="shopping-list">
                    <div >
                        {CART_LIST.map((value) => (
                            <div key={value} className="order-item">
                                <img className="order-icon" alt="icon of movie" />
                                <div className="item-info">Title: {(value.name.length > 9) ? value.name.substring(0,10) + "..." : value.name}</div>
                                <div className="item-info">Price: {value.price}</div>
                                <div>Return date</div>
                                <div className="item-info">Remove</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="order-summary">
                    <div style={{fontWeight: '700'}}>
                        Subtotal:
                    </div>
                    <div style={{paddingBottom: '15px'}}>
                        #######
                    </div>
                    <Button component={ Link } to="/checkout" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </div>
    )
}

export default Cart;
