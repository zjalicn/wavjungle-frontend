import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

import ProductCard from "../../components/ProductCard/ProductCard";
import HomeJumbotron from "./HomeJumbotron";

const proxyurl="https://cors-anywhere.herokuapp.com/";
const url="https://nzjalic-ecommerce.herokuapp.com";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newestProducts: []
    };
  }

  componentDidMount() {
    axios.get(`${proxyurl}${url}/api/getNewestProducts`).then(res => {
      this.setState({
        newestProducts: res.data //update state with product collection
      });
    });
  }

  render() {
    return (
      <Container>
        <Row className="show-grid">
          <Col md={12}>
            <HomeJumbotron 
            newestProducts={this.state.newestProducts}
            addToCart={this.props.addToCart}
            />
          </Col>
          <Col md={12}>
          <h2 className="main-page-featured">Featured</h2>
          </Col>
          {this.state.newestProducts.slice(1, 4).map(p => (
            <ProductCard
              id={p.id}
              productName={p.name}
              price={p.price}
              imageSrc={p.imageSrc}
              addToCart={this.props.addToCart}
            />
          ))}
        </Row>
        <hr />
        <Row>
          <Col md={12}>
            <Container className="product-card">
              <p className="coupon-code">COUPON:</p>
              <p className="coupon-code code">NIKO20</p>
            </Container>
          </Col>
        </Row>
        <hr />
      </Container>
    );
  }
}
