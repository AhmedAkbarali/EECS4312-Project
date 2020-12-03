import React, {Component} from 'react';
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



class Cart extends Component{

    state = {
        videos: [],
    }

    componentDidUpdate(prevProps){
        if(prevProps.videos !== this.props.videos)
            this.setState({videos: this.props.videos});
    }
    

    render () {

        var cardList = this.props.videos;
        let subtotal = 0;

        console.log(cardList);
        cardList.forEach(video => subtotal += video.price);
        
        return (
            <div >
                <h1 className="your-cart">Cart ID: {this.props.orderId}</h1>
                <div className="cart">
                    <div className="shopping-list">
                        <div >
                            {cardList.map((value) => (
                                <div key={value} className="order-item">
                                    <img className="order-icon" alt="icon of movie" />
                                    <div className="item-info">Title: {(value.title.length > 9) ? value.title.substring(0,10) + "..." : value.name}</div>
                                    <div className="item-info">Price: {value.price}</div>
                                    <div className="item-info">Return date</div>
                                    {/* <div className="item-info">Delete from Cart</div> */}
                                    <Button   variant="contained"
                                        color="primary"
                                        size="small"
                                        style={{ marginLeft: 16 }} 
                                        onClick={() => this.props.deleteVideoFromCart(value)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            {cardList.map((value) => (
                                <div key={value} className="order-item text-red">
                                    <img className="order-icon" alt="icon of movie" />
                                    <div className="item-info late">Title: {(value.title.length > 9) ? value.title.substring(0,10) + "..." : value.name}</div>
                                    <div className="item-info late">Late fee: {value.price}</div>
                                    <div className="item-info late">Return date</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="order-summary">
                        <div style={{fontWeight: '700'}}>
                            Subtotal:
                        </div>
                        <div style={{paddingBottom: '15px'}}>
                            {subtotal}
                        </div>
                        <Button component={ Link } to="/checkout" variant="contained" color="primary">Checkout</Button>
                    </div>
                </div>
            </div>
        );
    }

}

export default Cart;
