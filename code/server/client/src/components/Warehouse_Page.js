import React from 'react'
import Warehouse_Active_Orders from './Warehouse_Active_Orders.js';
import Warehouse_Inventory from './Warehouse_Inventory.js';
function Warehouse_Page() {
    return (
        <div>
        <Warehouse_Active_Orders></Warehouse_Active_Orders>
        <Warehouse_Inventory></Warehouse_Inventory>
        </div>
    )
}

export default Warehouse_Page
