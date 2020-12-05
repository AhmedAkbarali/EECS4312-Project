import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import '../style/Cart.css';
import { Link } from 'react-router-dom';

class Cart extends Component{

    state = {
        videos: [],
    }
    
    render () {

        var cardList = this.props.videos;
        var isLP = this.props.isLoyaltyPointUsed;
        let total = this.props.subtotal;

        // console.log(cardList);
        // cardList.forEach(video => subtotal += video.price);

        if (isLP)
            total -= this.props.LPspent;
        
        return (
            <div >
                <h1 className="your-cart">Loyalty Points: {this.props.loyalty_points}</h1>
                <div className="cart">
                    <div className="shopping-list">
                        <div >
                            {cardList.map((value) => (
                                <div key={value.id} className="order-item">
                                    <div className="item-info">Title: {(value.title.length > 9) ? value.title.substring(0,10) + "..." : value.name}</div>
                                    <div className="item-info">Price: {value.price}</div>
                                    <Button   variant="contained"
                                        color="primary"
                                        size="small"
                                        style={{ marginLeft: 16 }} 
                                        onClick={() => this.props.deleteVideoFromCart(value)}
                                    >
                                        Remove
                                    </Button>

                                    <Button  
                                        color="primary"
                                        size="small"
                                        style={{ marginLeft: 16 }}
                                        disabled={!((!isLP) || value.useLP)} 
                                        onClick={() => this.props.selectForLP(value)}
                                    >
                                        {!isLP ? "Use LP" : "Don\'t LP"}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="order-summary">
                        <div style={{fontWeight: '700'}}>
                            Subtotal:
                        </div>
                        <div style={{paddingBottom: '15px'}}>
                            {total}
                        </div>
                        <Button component={ Link } to="/checkout" variant="contained" color="primary">Checkout</Button>
                    </div>
                </div>
            </div>
        );
    }

}

export default Cart;
