import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

export default class EstimatedTotal extends Component {
    render() {
        return (
            <Row>
                <Col md={9}><h4>Total</h4></Col>
                <Col md={3}><h4>{`$${this.props.price}`}</h4></Col>
            </Row>
        )
    }
}