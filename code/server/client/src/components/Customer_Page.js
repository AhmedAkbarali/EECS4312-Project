import React, {useEffect} from 'react'
import Search from './Search.js';
import axios from "axios";
function Customer_Page() {

    useEffect(() => {
        axios.post('/api/orders/late', {}, {
            headers: {
                'Authorization': `token ${localStorage.getItem('token')}`
            }})
            .then(
                (res) => {
                    console.log(res.data)
                }
            )
    }, []);
    return (
        <div>
            <Search></Search>
        </div>
    )
}

export default Customer_Page
