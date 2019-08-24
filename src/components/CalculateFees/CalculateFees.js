import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

export default class CalculateTaxes extends Component {
    render() {
        return(
            <Row className="show-grid">
                <Col md={9}>
                    <div>Service Fees (4%): </div>
                </Col>
                <Col md={3}>
                    {`$${parseFloat(this.props.price).toFixed(2)}`}
                </Col>
            </Row>
        )
    }
}