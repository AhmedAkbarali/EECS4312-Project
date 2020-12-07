import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import '../style/Cart.css';
import { Link } from 'react-router-dom';
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RouteTest from "./RouteTest";
import axios from "axios";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const TIER_LOYALTY_COST = [75,50,25];
const TIERS = [1,2,3];

class Checkout extends Component {

    state = {
        oglp: 0,
        loyalty: 0,
        toggled: -1,
        subtotal: 0,
        videos: [],
        lowest: -1,
        tiers: [],
        cc: false,
        token: '',
        ccnum: '',
        newcc: false,
        outstandingFees: false,
        openToast: false,
        lateVideos: []
    }

    componentDidMount() {
        let list = []
        this.setState({token: localStorage.getItem('token')})
        axios.get("user",{
            headers: {
                'Authorization': `token ${localStorage.getItem('token')}`
            }})
            .then( (res) => {
                this.setState({loyalty: res.data.loyalty_points})
                this.setState({oglp: res.data.loyalty_points})
                this.setState({outstandingFees: (res.data.outstandingFees > 0)})
                res.data.cart.map(video => {
                    list.push(video.toString())
                })
                if(res.data.cc_info !== "Not added card to account.") {
                    this.setState({cc: true})
                }
                axios.post('/video/get_videos_with_ids', {list_of_ids: list})
                    .then(response => {
                        this.setState({videos: response.data})
                        list = []
                        this.state.videos.map((video) => {
                            this.setState({subtotal: this.state.subtotal + video.Price})
                            list.push(video.Tier)
                        })
                        this.setState({tiers: [...new Set(list)]})
                    })
            })
            .catch(err => {
                alert(err.response.data);
            });
        axios.post('/api/orders/late', {}, {
            headers: {
                'Authorization': `token ${localStorage.getItem('token')}`
            }})
            .then(
                (res) => {
                    console.log(res.data)
                    axios.post('/api/orders/late/videos', {orders: res.data}, {
                        headers: {
                            'Authorization': `token ${localStorage.getItem('token')}`
                        }})
                        .then(response =>{
                            console.log(response.data)
                            list = []
                            response.data.map((video) => {
                                list.push(video)
                            })
                            this.setState({lateVideos: list})
                        })
                }
            )
    }

    handleLoyaltyToggle = async (i, e) => {
      e.preventDefault()
      if(this.state.lowest > -1) {
          await this.setState({subtotal: this.state.lowest + this.state.subtotal});
          await this.setState({loyalty: this.state.loyalty + TIER_LOYALTY_COST[this.state.toggled]});
          await this.setState({lowest: -1});
      }

      await this.setState({toggled: i});
      let temp = -1;
      await this.setState({loyalty: this.state.loyalty - TIER_LOYALTY_COST[this.state.toggled]});

      this.state.videos.map(video => {
          if((video.Tier === (i + 1)) && ((video.Price < temp) || (temp === -1))) {
              temp = video.Price
          }
      })
      await this.setState({lowest: temp});
      if(temp > -1) {
          await this.setState({subtotal: this.state.subtotal - this.state.lowest});
      }
    };

    handlePaymentToggle(e) {
        e.preventDefault();

        if(e.target.value == "newcc") {
            this.setState({newcc: true})
        } else {
            this.setState({newcc: false})
        }
    }

    handlePayment = async () => {
        let payload = {
            videos: [],
            subtotal: this.state.subtotal,
            loyalty_points_used: this.state.oglp - this.state.loyalty
        }
        this.state.videos.map((video) => {
          payload.videos.push(video._id.toString())
        })
        //Add Order
        await axios.post("/api/orders", payload, {
            headers: {
                'authorization': `token ${this.state.token}`
            }}).then(
            res => {
                axios.post("/user/cart/paid", {loyalty_gained: Math.floor(this.state.subtotal) + this.state.loyalty}, {
                    headers: {
                        'authorization': `token ${this.state.token}`
                    }}).then(res =>{console.log("cleared" + res.data)}).catch((error) => {
                    console.log(error)
                });
                this.handleToastOpen();
            }
        ).catch((error) => {
            console.log(error)
        });
        
    }

    // Payment toast functions
    handleToastOpen = () => {
        this.setState({openToast: true})
        setTimeout(function() { //Start the timer
            this.props.history.push("home");
        }.bind(this), 2000)

      };
    
    handleToastClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        this.setState({openToast: false})
    };

    render (){
        return (
            <div >
                <h1 className="your-cart">Confirm Order</h1>
                <div className="cart">
                    <div className="shopping-list">
                        <div style={{margin: '50px'}}>
                            { this.state.videos ? this.state.videos.map((value) => (
                                <div key={value._id} className="order-item">
                                    <h5 className="item-info">Title: {value.Title}</h5>
                                    <div className="item-info">Price: {value.Price}</div>
                                    <div className="item-info">Tier: {value.Tier}</div>
                                    <div className="item-info">Return date {value.DaysRent}</div>
                                </div>
                            )) : ''}
                        </div>
                    </div>
                    <div className="shopping-list">
                        <div style={{margin: '50px', textColor: 'red'}}>
                            { this.state.lateVideos ? this.state.lateVideos.map((value) => (
                                <div key={value._id} className="order-item">
                                    <h5 className="item-info">Title: {value.Title}</h5>
                                    <div className="item-info">Price: {value.Price}</div>
                                    <div className="item-info">Tier: {value.Tier}</div>
                                    <div className="item-info">LATE</div>
                                </div>
                            )) : ''}
                        </div>
                    </div>
                    <div style={{display: 'grid', justifyContent: 'center', padding: '50px'}}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Use Loyalty Points: </FormLabel>
                            <RadioGroup aria-label="loyalty" name="loyalty1" value={this.state.value} onChange={""}>
                                <FormControlLabel
                                    disabled={(this.state.loyalty < TIER_LOYALTY_COST[0]) || (this.state.tiers.indexOf(TIERS[0]) === -1) || this.state.videos.length < 2}
                                    value="tier1" control={ <Radio />}
                                    onChange={ (e) => this.handleLoyaltyToggle(0, e)}
                                    label="Loyalty Points for Tier 1 (75pts)"
                                />
                                <FormControlLabel
                                    disabled={(this.state.loyalty < TIER_LOYALTY_COST[1]) || (this.state.tiers.indexOf(TIERS[1]) === -1) || this.state.videos.length < 2}
                                    value="tier2" control={ <Radio />}
                                    onChange={ (e) => this.handleLoyaltyToggle(1, e)}
                                    label="Loyalty Points for Tier 2 (50pts)"
                                />
                                <FormControlLabel
                                    disabled={(this.state.loyalty < TIER_LOYALTY_COST[2]) || (this.state.tiers.indexOf(TIERS[2]) === -1) || this.state.videos.length < 2}
                                    value="tier3" control={ <Radio />}
                                    onChange={ (e) => this.handleLoyaltyToggle(2, e)}
                                    label="Loyalty Points for Tier 3 (25pts)"
                                />
                            </RadioGroup>
                        </FormControl>

                        <FormControl component="fieldset">
                            <FormLabel component="payment">Payment Method:  </FormLabel>
                            <RadioGroup aria-label="pay" name="pay1" value={this.state.valueC} onChange={""}>
                                <FormControlLabel
                                    disabled={!this.state.cc}
                                    value="existcc"
                                    checked={!this.state.newcc && this.state.cc}
                                    control={ <Radio />}
                                    onChange={ (e) => this.handlePaymentToggle(e)}
                                    label="Use existing Credit Card"
                                />
                                <FormControlLabel
                                    value="newcc"
                                    control={ <Radio />}
                                    onChange={e => this.handlePaymentToggle(e)}
                                    label="Use new Credit Card"
                                />
                                {this.state.newcc ? <input onChange={e => this.setState({ccnum: e.target.value})}></input> : ''}
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="order-summary">
                        <div style={{fontWeight: '700'}}>
                            Subtotal:
                        </div>
                        <div style={{paddingBottom: '15px'}}>
                            {this.state.subtotal}
                        </div>
                        <div style={{fontWeight: '700'}}>
                            Loyalty Points:
                        </div>
                        <div style={{paddingBottom: '15px'}}>
                            {this.state.loyalty}
                        </div>
                        <div style={{fontWeight: '700'}}>
                            Loyalty Points From This Order:
                        </div>
                        <div style={{paddingBottom: '15px'}}>
                            {Math.floor(this.state.subtotal)}
                        </div>
                        <Button disabled={this.state.outstandingFees || (this.state.ccnum == '' && this.state.newcc) || (!this.state.newcc && !this.state.cc)} variant="contained" color="primary" onClick={() => this.handlePayment()}>Pay Now</Button>
                        <div>
                        {this.state.outstandingFees && (
                            <div>
                                <p style={{color:'red'}}>You must pay your outstanding fees before proceeding!</p>
                                <br></br>
                            </div>
                        )}
                        </div>
                    </div>
                </div>

                <Snackbar open={this.state.openToast} autoHideDuration={1500} onClose={this.handleToastClose}>
                <Alert onClose={this.handleToastClose} severity="success">
                    Payment Successful!
                </Alert>
                </Snackbar>

            </div>
        )
    }


}

export default Checkout;
