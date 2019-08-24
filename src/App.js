import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';

import Header from "./components/Header/Header";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import HomePage from "./pages/HomePage/HomePage";
import StorefrontPage from "./pages/StorefrontPage/StorefrontPage";
import LoginRegisterPage from "./pages/LoginRegisterPage/LoginRegisterPage";
import PLP from "./pages/PLP/plp";

import { history } from './helpers/history';
import { alertActions } from './actions/alertActions';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

import "./css/App.css";

const url="https://nzjalic-ecommerce.herokuapp.com";


class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = { 
      cart: JSON.parse(localStorage.getItem("cart")) || []
    }
  }
  
  getProductById = id => {
    axios.get(`${url}/api/plp/${id}`).then(res => {
      return res.data;
    }); 
  };

  addToCart = id => {
    this.setState({
      cart: ([...this.state.cart, id]).sort()
    }, () => {
      localStorage.setItem("cart", JSON.stringify(this.state.cart.sort()));
    });
  };

  removeFromCart = index => {
    this.state.cart.splice(index, 1);
    this.setState({
      cart: this.state.cart.sort()
    }, () => {
      localStorage.setItem("cart", JSON.stringify(this.state.cart.sort()));
    });
    window.location.reload();
  };

  render() {
    return (
      <div>
        <Header cart={this.state.cart}/>
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/" component={HomePage}  />
            <Route path="/home" 
            render={(props) => <HomePage {...props} addToCart={this.addToCart} />}
            />            
            <Route path="/shop" 
            render={(props) => <StorefrontPage {...props} addToCart={this.addToCart} />}
            />
            <Route path="/plp/:pid" 
            render={(props) => <PLP {...props} addToCart={this.addToCart} />}            
            component={PLP} />
            <Route path="/login-register" component={LoginRegisterPage} /> 
            <Route path="/cart" 
            render={(props) => <CheckoutPage {...props} removeFromCart={this.removeFromCart} />}            
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state  => {
  return state
}

export default connect(mapStateToProps)(App);