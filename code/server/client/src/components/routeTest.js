import * as axios from "mongoose/lib/promise_provider";
import {Button} from "@material-ui/core";
import React, {Component} from "react";


class routeTest extends Component {
    state = {
        orders: []
    }

    componentDidMount() {
        const temp = () => async () => {
            const tres = await axios.get('/api/orders');
            await this.setState(this.orders, tres);
        }
    }

    handleClick() {
        const temp = () => async () => {
            const tres = await axios.post('/api/orders');
            history.push('/orders');
        }
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleClick}>Add Order</Button>
                {this.res.order}
            </div>
    )
    }
}

export default routeTest;