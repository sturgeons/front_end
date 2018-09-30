import React, {Component} from 'react';
import {Row, Col, ControlLabel, FormGroup} from 'react-bootstrap';
import { connect } from 'react-redux';


class Comp extends Component {
    render() {
        return (<div>
            {
                this.props.datas.map(record =>
                    <FormGroup key={Math.random()}>
                        <Col componentClass={ControlLabel} md={3}>返修合格数量:</Col>
                        <Col md={2}><span className="fx-ok">{record.OK}</span></Col>
                        <Col componentClass={ControlLabel} md={3}>返修报废数量:</Col>
                        <Col md={2}><span className="fx-rework">{record.REWORK}</span></Col>
                    </FormGroup>
                )
            }
            </div>
        )
    }
}

export default connect((state, ownProps) => ({
    datas: state.STdatasReducer.datas
}))(Comp);
