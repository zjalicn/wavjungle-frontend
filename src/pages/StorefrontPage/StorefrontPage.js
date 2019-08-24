import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';
import ProductCard from '../../components/ProductCard/ProductCard';

export default class StorefrontPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      productList: []
    };
  }

  componentDidMount() {
    const url="https://nzjalic-ecommerce.herokuapp.com";
    axios.get(`${url}/api/getProducts`)
    .then(res => {
      this.setState({ 
        products: res.data //update state with product collection
      });
    });
  }

  render() {
    return (
        <Container>
            <Row className="show-grid">  
              {this.state.products.map (p => 
                <ProductCard 
                  id={p.id}
                  productName={p.name}
                  price={p.price}
                  imageSrc={p.imageSrc} 
                  addToCart={this.props.addToCart}
                />
              )}
            </Row>
        </Container>
    );
  }
}
