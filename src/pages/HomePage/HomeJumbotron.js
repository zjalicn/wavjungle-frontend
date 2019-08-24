import React, { Component } from 'react';
import { Jumbotron, Row, Col, Button } from 'react-bootstrap';
import FeaturedProductCard from '../../components/FeaturedProductCard/FeaturedProductCard';

export default class HomeJumbotron extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Jumbotron>
        {this.props.newestProducts.slice(0, 1).map(p => (
          <Row>
            <FeaturedProductCard
              id={p.id}
              productName={p.name}
              price={p.price}
              imageSrc={p.imageSrc}
            />
            <Col md={1}>
              <br />
            </Col>
            <Col md={4} className="jumbotron-card">
              <br />
              <h2 className="jumbotron-new-text">*NEW*</h2>
              <h1>{this.props.newestProducts[0].name}</h1>
              <br />
              <hr />
              <h2>${this.props.newestProducts[0].price}</h2>
              <p className="jumbotron-desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                viverra magna at consequat ornare. Quisque posuere commodo ex id
                rhoncus.
              </p>
              <hr />
              <div className="button-spacing">
                <a href={`/plp/${p.id}`}>
                  <Button variant="success">Check it Out</Button>
                </a>
                <p></p>
                  <Button 
                  onClick={() => this.props.addToCart(p.id)}
                  variant="success">Add to Cart</Button>
              </div>
              <br />
              <br />
            </Col>
          </Row>
        ))}
      </Jumbotron>
    );
  }
}
