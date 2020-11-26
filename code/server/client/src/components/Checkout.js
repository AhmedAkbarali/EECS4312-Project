import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import '../style/Cart.css';
import { Link } from 'react-router-dom';
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

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

class Checkout extends Component {
    state = {
        value: 'credit'
    }

    handlePaymentToggle = e => {
      this.setState({value: e.target.value})
    };

    renderPayment () {
        {
            switch (this.state.value) {
                case null:
                    return;
                case 'credit':
                    return (
                        <div>
                            <input></input>
                        </div>
                    );
                case 'loyalty':
                    return (
                        <div>Loyalty</div>
                    );
                default:
                    return [
                        <div>Credit</div>
                    ];
            }
        }
    }

    render (){
        return (
            <div >
                <h1 className="your-cart">Confirm Order</h1>
                <div className="cart">
                    <div className="shopping-list">
                        <div >
                            {CART_LIST.map((value) => (
                                <div key={value} className="order-item">
                                    <img className="order-icon" alt="icon of movie" />
                                    <div className="item-info">Title: {(value.name.length > 9) ? value.name.substring(0,10) + "..." : value.name}</div>
                                    <div className="item-info">Price: {value.price}</div>
                                    <div>Return date</div>
                                </div>
                            ))}
                        </div>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Pay with:</FormLabel>
                            <RadioGroup aria-label="pay" name="pay1" value={this.state.value} onChange={""}>
                                <FormControlLabel value="credit" control={<Radio />} onClick={ e => this.handlePaymentToggle(e)} label="Credit Card" />
                                <FormControlLabel value="loyalty" control={<Radio />} onClick={ e => this.handlePaymentToggle(e)} label="Loyalty Points" />
                            </RadioGroup>
                        </FormControl>
                        {this.renderPayment()}
                        <div className="" style={{display: 'flex', flexDirection: 'column', justifySelf: 'flex-end'}}>
                            <div style={{fontWeight: '700'}}>
                                Total:
                            </div>
                            <div style={{paddingBottom: '5px'}}>
                                #######
                            </div>
                            <Button component={ Link } to="/" variant="contained" color="primary">Pay Now</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default Checkout;
