import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import '../style/Cart.css';
import { Link } from 'react-router-dom';
import axios from "axios";

class CustomerCart extends Component{

    state = {
        videos: [],
        outstandingFees: false,
        subtotal: 0

    }



    componentDidMount() {
        let list = [];

        axios.get("user",{
            headers: {
                'Authorization': `token ${localStorage.getItem('token')}`
            }})
            .then( (res) => {

                if(res.data.outstandingFees < 0) {
                    this.setState({outstandingFees: true})
                }
                res.data.cart.map((video) => {
                    list.push(video.toString())
                })

                axios.post('/video/get_videos_with_ids', {list_of_ids: list})
                    .then(response => {
                        this.setState({videos: response.data})
                        console.log(this.state.videos)
                        this.state.videos.map((video) => {
                            this.setState({subtotal: this.state.subtotal + video.Price})
                        })
                    })
            })
            .catch(err => {
                alert(err.response.data);
            });
    }

    handleRemove(video, e) {
        e.preventDefault();
        console.log(video + video._id)
        axios.post("/user/cart/remove", {videoId: video._id}, {
            headers: {
                'authorization': `token ${localStorage.getItem('token')}`
            }}).then( res => {
                let list = this.state.videos
                console.log(video._id)
                list = list.filter((item) => item._id !== video._id)
                this.setState({videos: list})
                this.setState({subtotal: this.state.subtotal - video.Price})
            }).catch((error) => {
                console.log(error)
            });
    }

    render () {
        // console.log(cardList);
        return (
            <div >
                <h1 className="your-cart">Cart</h1>
                <div className="cart">
                    <div className="shopping-list">
                        <div >
                            { this.state.videos ? this.state.videos.map((value) => (
                                <div key={value._id} className="order-item">
                                    <img className="order-icon" alt="icon of movie" />
                                    <div className="item-info">Title: {value.Title}</div>
                                    <div className="item-info">Price: {value.Price}</div>
                                    <div className="item-info">Return date</div>
                                    <Button   variant="contained"
                                              color="primary"
                                              size="small"
                                              style={{ marginLeft: 16 }}
                                              onClick={(e) => {
                                                  this.handleRemove(value, e)
                                              }}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            )) : ''}
                        </div>
                    </div>
                    <div className="order-summary">
                        <div style={{fontWeight: '700'}}>
                            Subtotal:
                        </div>
                        <div style={{paddingBottom: '15px'}}>
                            {this.state.subtotal}
                        </div>
                        <Button disabled={this.state.outstandingFees} component={ Link } to="/checkout" variant="contained" color="primary">Checkout</Button>
                    </div>
                </div>
            </div>
        );
    }

}

export default CustomerCart;