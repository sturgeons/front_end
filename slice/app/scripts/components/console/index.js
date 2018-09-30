import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeValue } from 'scripts/actions';
import { Row, Col, Panel } from 'react-bootstrap';
import InStore from './InStore';
import OutStore from './OutStore';

class Comp extends Component {
    render() {
        return (
            <Row className={this.props.error ? "console-panel console-error" : "console-panel"}>
                <Col md={8}>
                    <InStore randomKey={Math.random()}/>
                </Col>
                <Col md={4} style={{borderLeft: "solid 2px gray"}}>
                    <OutStore randomKey={Math.random()}/>
                </Col>
            </Row>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
});

export default connect((state, cls) => ({
    error: state.StaticReducer.error
}), mapDispatchToProps)(Comp);
