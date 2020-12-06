import logo from './logo.svg';
import './App.css';

import Login from './components/Login.js';
import Cart from './components/Cart.js';
import Checkout from './components/Checkout.js';
import Dynamic_Header from './components/Dynamic_Header.js';
import Landing_Page from './components/Landing_Page.js';
import Profile from './components/Profile.js';
import Register from './components/Register.js';
import EmployeeRegister from './components/EmployeeRegister.js';
import Search from './components/Search.js';
import Operator from './components/Operator.js';
import Results from './components/Results.js';
import Manager_Page from './components/Manager_Page';
import { Switch, Route, Link } from 'react-router-dom';
import Warehouse_Active_Orders from './components/Warehouse_Active_Orders.js'
import Warehouse_Inventory from './components/Warehouse_Inventory.js'
import Shipper from './components/Shipper_Page.js';

function App() {
  return (
    <div className="App">
      <Dynamic_Header></Dynamic_Header>
      <Switch>
          <Route  path="/" exact component={Login}/>
          <Route  path="/register" component={Register}/>
          <Route  path="/eregister" component={EmployeeRegister}/>
          <Route  path="/profile" component={Profile}/>
          <Route  path="/home" component={Landing_Page}/>
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/manager" component={Manager_Page}/>
          <Route path="/search" component={Search} />
          <Route path="/operator" component={Operator} />
          <Route path="/shipper" component={Shipper} />
          {/* <Route path="/warehouseActiveOrders" component={Warehouse_Active_Orders} />
          <Route path="/warehouseInventory" component={Warehouse_Inventory} /> */}
      </Switch>
    </div>

  );
}

export default App;
