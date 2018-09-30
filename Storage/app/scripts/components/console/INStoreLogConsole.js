import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';

class Comp extends Component {
    render() {
        return (<div>
            {
                this.props.instores.map(record =>
                    <Row key={Math.random()}>
                        <Col md={3}>{record.CREATED}</Col>
                        <Col md={3}>{record.CUST_PARTNO}</Col>
                        <Col md={3}>{record.RECORD_NO}</Col>
                        <Col md={1}>{record.PART_COUNT}</Col>
                        <Col md={2}>{record.UNIT_NAME}</Col>
                    </Row>
                )
            }
            </div>
        )
    }
}

export default connect((state, ownProps) => ({
    instores: state.STinstoreReducer.instores
}))(Comp);
