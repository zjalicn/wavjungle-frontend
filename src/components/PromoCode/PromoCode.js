import React, { Component } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  FormGroup,
  FormControl,
  Container
} from "react-bootstrap";
import { connect } from 'react-redux';
import { handleChange } from '../../actions/promoCodeActions';

class PromoCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      promoDiscount: 0,
      price: 0,
      total: 100,
      disablePromoButton: false
    };
  }

  handleChange = e => {
    this.props.handleChange(e);
  }

  render() {
    return (
      <div>
        <Container>
          <Form>
            <Row className="show-grid">
              <Col md={9}>
                <FormGroup controlId="formInlineName">
                  <FormControl
                    type="text"
                    placeholder="Enter promo code"
                    value={this.state.promoCode}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <Button
                  variant="success"
                  className="btn-round"
                  disabled={this.props.isDisabled}
                  onClick={this.props.giveDiscount}
                >
                  Apply
                </Button>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col md={9}>Promo Discount:</Col>
              <Col md={3}>
                {this.props.isDisabled
                  ? `-$${(this.props.price * 0.2).toFixed(2)}`
                  : '$0'
                  
                }
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { handleChange })(PromoCode); //doing it this way for redux
