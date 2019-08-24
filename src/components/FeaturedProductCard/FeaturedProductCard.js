import React, { Component } from 'react';
import { Container, Col } from 'react-bootstrap';

export default class StorefrontProduct extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <Col md={6}>
        <Container className="product-card">
            <img
            height="100%"
            width="100%"
            src={require(`../../images/${this.props.imageSrc}.jpg`)} 
            />
        </Container>
    </Col>
    );
  }
}
