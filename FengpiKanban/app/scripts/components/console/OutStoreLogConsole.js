import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';

class Comp extends Component {
    render() {
        return (<div>
            {
                this.props.outstores.map(record =>
                    <Row key={Math.random()}>
                        <Col md={2}>{record.CREATED}</Col>
                        <Col md={3}>{record.QADNO}</Col>
                        <Col md={3}>{record.RECORD_NO}</Col>
                        <Col md={2}>{record.PART_COUNT}</Col>
                        <Col md={2}>{record.UNIT_NAME}</Col>
                    </Row>
                )
            }
            </div>
        )
    }
}

export default connect((state, ownProps) => ({
    outstores: state.SToutstoreReducer.outstores
}))(Comp);
