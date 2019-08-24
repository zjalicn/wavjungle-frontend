import React, { Component } from "react";
import { Container, Button, Col } from "react-bootstrap";

class ProductCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Col md={4} className="featured-col">
        <Container className="product-card">
          <a href={`/plp/${this.props.id}`} className="product-card-link">
            <img
              height="100%"
              width="100%"
              src={require(`../../images/${this.props.imageSrc}.jpg`)}
            />
            <p className="card-name">{this.props.productName}</p>
            <p className="card-price">${this.props.price}</p>
          </a>
          <div className="button-spacing">
            <a href={`/plp/${this.props.id}`}>
              <Button variant="success">Check it Out</Button>
            </a>
            <p />
            <Button
              variant="success"
              onClick={() => this.props.addToCart(this.props.id)}
            >
              Add to Cart
            </Button>
          </div>
        </Container>
      </Col>
    );
  }
}

export default ProductCard;
