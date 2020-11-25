import logo from './logo.svg';
import './App.css';

import Login from './components/Login.js';
import Cart from './components/Cart.js';
import Customer_Header from './components/Customer_Header.js';
import Landing_Page from './components/Landing_Page.js';
import Profile from './components/Profile.js';
import Register from './components/Register.js';
import Search from './components/Search.js';
import Results from './components/Results.js';

import { Switch, Route, Link } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Customer_Header></Customer_Header>

      <Switch>
      <Route  path="/" exact component={Login}/> 
      <Route  path="/register" component={Register}/>
      <Route  path="/profile" component={Profile}/>
      <Route  path="/home" component={Landing_Page}/>
      </Switch>
    </div>

  );
}

export default App;
