import React, { Component } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

export default class PLP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productInfo: []
    };
  }

  componentDidMount() {
    axios.get(`/api/plp/${this.props.match.params.pid}`).then(res => {
      this.setState({
        productInfo: res.data[0] //update state with product collection
      });
    });
  }

  render() {
    return (
      <Container>
        <Row className="show-grid">
          <Col md={6}>
            <img
              height="100%"
              width="100%"
              alt=""
              src={require(`../../images/${
                this.state.productInfo.imageSrc
              }.jpg`)}
            />
          </Col>
          <Col md={6} className="plp-top-info">
            <h1>{this.state.productInfo.name}</h1>
            <h3>${this.state.productInfo.price}</h3>
            <Button 
            onClick={this.props.addToCart()}
            variant="success"
            >Add to Cart</Button>
          </Col>
        </Row>
        <hr />
        <Row className="show-grid">
          <Col md={12}>
            <h3>Description</h3>
            <br />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              viverra magna at consequat ornare. Quisque posuere commodo ex id
              rhoncus. Cras pulvinar odio nec mauris dapibus pharetra. Donec id
              scelerisque tortor. Sed a metus mauris. Proin urna nisi, porta
              eget neque ac, venenatis condimentum lacus. Proin ornare bibendum
              feugiat. Nullam sodales lacus sagittis nisl finibus ornare.
              Vivamus ut diam non libero finibus posuere nec vitae elit. Donec
              cursus porta quam, id lacinia massa viverra ut.
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}
