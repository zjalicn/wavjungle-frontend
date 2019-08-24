import React, { Component } from "react";
import { connect } from 'react-redux';
import { Navbar, Nav } from "react-bootstrap";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Navbar bg="light" expand="sm">
        <Navbar.Brand href="/home">
            <img 
            height="20px"
            weight="20px"
            src={require('../../images/logo.png')}/>
            .WAV JUNGLE
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/shop">// Browse All</Nav.Link>
              <Nav.Link href="/cart">// Cart ({`${this.props.cart.length}`})</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default Header;