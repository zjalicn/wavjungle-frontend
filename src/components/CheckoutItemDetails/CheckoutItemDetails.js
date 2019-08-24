import React, { Component } from "react";
import { Media, Row, Col, Container } from "react-bootstrap";

export default class CheckoutItemDetails extends Component {

  render() {
    return (
      <div>
        <hr />
        <Media>
          <img
            width={160}
            height={100}
            alt=""
            src={require(`../../images/${this.props.imageSrc}.jpg`)}
          />
          <Media.Body>
            <Container>
              <h5>{`${this.props.productName}`}</h5>
              <Row className="show-grid">
                <Col sm={11}>{`$${this.props.price}`}</Col>
                <div 
                style={{display:"inline"}} 
                className="checkout-remove-x"
                onClick={e => this.props.removeFromCart(this.props.index)}
                >
                  x
                </div>
              </Row>
            </Container>
          </Media.Body>
        </Media>
      </div>
    );
  }
}
