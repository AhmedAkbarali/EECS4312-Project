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



function App() {
  return (
    <div className="App">
      <Customer_Header></Customer_Header>
      <Login></Login>
      <Cart></Cart>
      <Landing_Page></Landing_Page>
      <Profile></Profile>
      <Register></Register>
      <Search></Search>
      <Results></Results>
    </div>
  );
}

export default App;
