import React, { Component } from 'react';
import { Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';

var styles = {
    taxes: {
        textDecoration: 'underline'
    },
}

export default class CalculateTaxes extends Component {
    render() {
        const tooltip = (
            <Tooltip id="tooltip">
                <p>Tax will vary depending on location.</p>
            </Tooltip>
        )

        return(
            <Row className="show-grid">
                <Col md={9}>
                    <OverlayTrigger placement="bottom" overlay={tooltip}>
                        <div style={styles.taxes}>Taxes (7%): </div>
                    </OverlayTrigger>
                </Col>
                <Col md={3}>
                    {`$${parseFloat(this.props.price).toFixed(2)}`}
                </Col>
            </Row>
        )
    }
}