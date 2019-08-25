import React, { Component } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import CalculateSubtotal from "../../components/CalculateSubtotal/CalculateSubtotal";
import CalculateTaxes from "../../components/CalculateTaxes/CalculateTaxes";
import CalculateFees from "../../components/CalculateFees/CalculateFees";
import EstimatedTotal from "../../components/EstimatedTotal/EstimatedTotal";
import CheckoutItemDetails from "../../components/CheckoutItemDetails/CheckoutItemDetails";
import PromoCode from "../../components/PromoCode/PromoCode";

import { connect } from "react-redux";
import { handleChange } from '../../actions/promoCodeActions';

const proxyurl="https://cors-anywhere.herokuapp.com/";
const url="https://nzjalic-ecommerce.herokuapp.com";

class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: JSON.parse(localStorage.getItem("cart")) || [],
      itemsInCart: [],
      subtotal: 0,
      taxes: 0.07,
      fees: 0.04,
      actualTotal: 0,
      disablePromo: false
    };
  }

  componentDidMount = () => {
    this.state.cart.map(id => {
      axios.get(`${proxyurl}${url}/api/plp/${id}`).then(res => {
        this.setState({
          itemsInCart: [...this.state.itemsInCart, res.data[0]], //update state with product collection
          subtotal: this.state.subtotal + parseInt(res.data[0].price),
        }, () => {
          this.setState({
            actualTotal: this.state.subtotal * (1 + this.state.taxes + this.state.fees),
          });
        })
      })
    })
  };

  giveDiscountHandler = e => {
    if (this.props.promoCode === "NIKO20") {
      this.setState({
        actualTotal: this.state.actualTotal * ( 1 - 0.2 ),
        disablePromo: true
      })
    }
    return;
  }

  render() {
    return (
      <div className="container">
        <Container className="purchase-card">
          <Container>
            <Container>
              {this.state.itemsInCart.map((p, index) => (
                <CheckoutItemDetails
                  index={index}
                  id={p.id}
                  productName={p.name}
                  price={p.price}
                  imageSrc={p.imageSrc}
                  removeFromCart={this.props.removeFromCart}
                />
              ))}
            </Container>
          </Container>
          <hr />
          <Container>
            <CalculateSubtotal price={this.state.subtotal} />
            <CalculateTaxes price={this.state.subtotal * this.state.taxes} />
            <CalculateFees price={this.state.subtotal * this.state.fees} />
          </Container>
          <hr />
          <PromoCode
            giveDiscount={() => this.giveDiscountHandler()}
            isDisabled={this.state.disablePromo}
            price={this.state.subtotal}
          />
          <hr />
          <Container>
            <EstimatedTotal price={this.state.actualTotal.toFixed(2)} />
          </Container>
          <hr />
          <Row>
            <Col md={4} />
            <Col md={4}>
              <Button 
              variant="success"
              onClick={() => alert("Hookup Paypal/Stripe here")}
              >Process Order</Button>
            </Col>
            <Col md={4} />
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  promoCode: state.promoCode.value
});

export default connect(mapStateToProps, { handleChange })(CheckoutPage);