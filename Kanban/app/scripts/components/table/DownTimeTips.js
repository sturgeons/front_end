import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';

/**
 * 停台信息的Tooltip提示工具
 */
class Comp extends Component {
    render() {
        return (
            <div>
                <Row className="rc-tooltip-header">
                    <Col md={2}>生产线</Col>
                    <Col md={2}>工位</Col>
                    <Col md={3}>开始时间</Col>
                    <Col md={3}>结束时间</Col>
                    <Col md={2}>原因</Col>
                </Row>
                {
                    this.props.downtimes.map((item) => {
                        return (
                            <Row key={Math.random()}>
                                <Col md={2}>{item.LINE}</Col>
                                <Col md={2}>{item.OP}</Col>
                                <Col md={3}>{item.BEGIN_TIME}</Col>
                                <Col md={3}>{item.END_TIME}</Col>
                                <Col md={2}>{item.REASON_NAME}</Col>
                            </Row>
                        )
                    })
                }
            </div>
        )
    }
}

export default connect((state) => ({
    downtimes: state.DownTimeReducer.downtime
}))(Comp);
