import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';

class Comp extends Component {
    render() {
        const datas = this.props.datas;
        return (
            <Row className={ this.props.odd ? 'odd_row' : '' }>
                <Col md={3}>
                    <p>{datas[0].SLICE_NO}</p>
                    <p>{datas[0].SLICE_COUNT}</p>
                </Col>
                <Col md={9}>
                    {
                        datas.map(data =>
                            <Row key={Math.random()} style={{
                                margin: '10px 0',
                                textAlign: 'right'
                            }}>
                                <Col md={6} style={{textAlign: 'center'}}>{data.BATCH_NO}</Col>
                                <Col md={3}>{data.BATCH_COUNT}</Col>
                                <Col md={3}>{data.BOX_NO}</Col>
                            </Row>
                        )
                    }
                </Col>
            </Row>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect((state, ownProps) => ({
    datas: ownProps.datas.comp,
    odd: ownProps.odd
}), mapDispatchToProps)(Comp);
